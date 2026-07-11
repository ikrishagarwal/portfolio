import { blogsTable } from "@/db/schema";
import { Redis } from "@upstash/redis";
import type { APIRoute } from "astro";
import { UPSTASH_REDIS_REST_URL, CRON_SECRET, POSTGRE_DATABASE_URL, UPSTASH_REDIS_REST_TOKEN } from "astro:env/server";
import { eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

export const prerender = false;

const redis = new Redis({
  token: UPSTASH_REDIS_REST_TOKEN,
  url: UPSTASH_REDIS_REST_URL,
});
const db = drizzle(POSTGRE_DATABASE_URL);

export const GET: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const redisKeyPattern = `${import.meta.env.DEV ? "dev:" : ""}blog:views:*`;

    let cursor = 0;
    const keys: string[] = [];
    const redisValues: string[] = [];
    do {
      const [nextCursor, batchKeys] = await redis.scan(cursor, {
        match: redisKeyPattern,
        count: 100,
      });
      keys.push(...batchKeys);

      const batchRedisValues = await redis.mget<string[]>(...batchKeys);
      redisValues.push(...batchRedisValues);

      cursor = nextCursor === "0" ? 0 : Number(nextCursor);
    } while (cursor !== 0);

    if (keys.length === 0) {
      return Response.json({ message: "No new views to sync" }, { status: 200 });
    }

    const updates = keys.reduce(
      (acc, key, index) => {
        const slug = key.split(":").at(-1)!;
        const viewCount = parseInt(String(redisValues[index]) || "0", 10);
        if (!isNaN(viewCount) && viewCount !== 0) acc[slug] = viewCount;
        return acc;
      },
      {} as Record<string, number>,
    );

    const slugs = Object.keys(updates);

    const fetchedData = await db.select().from(blogsTable).where(inArray(blogsTable.slug, slugs));

    const pendingUpdates = fetchedData.filter((dbRow) => {
      const latestViewCount = updates[dbRow.slug];
      return latestViewCount > dbRow.viewCount;
    });

    if (pendingUpdates.length === 0) {
      return Response.json({ message: "No database updates needed" }, { status: 200 });
    }

    // times when i future proof my work more than it needs
    const chunkSize = 50;
    const maxRetries = 3;
    let failedCount = 0;
    for (let i = 0; i < pendingUpdates.length; i += chunkSize) {
      let currentBatch = pendingUpdates.slice(i, i + chunkSize);
      let attempt = 1;

      console.log(
        `Processing chunk ${i / chunkSize + 1} (Items ${i + 1} to ${Math.min(i + chunkSize, pendingUpdates.length)})...`,
      );
      while (currentBatch.length > 0 && attempt <= maxRetries) {
        let failedUpdates: typeof currentBatch = [];
        (
          await Promise.allSettled(
            currentBatch.map((row) =>
              db.update(blogsTable).set({ viewCount: updates[row.slug] }).where(eq(blogsTable.slug, row.slug)),
            ),
          )
        ).forEach((result, index) => {
          if (result.status === "rejected") failedUpdates.push(currentBatch[index]);
        });

        if (failedUpdates.length > 0) {
          if (attempt < maxRetries) {
            console.warn(`${failedUpdates.length} updates failed in this chunk. Retrying in ${1000 * attempt}ms...`);
            await new Promise((res) => setTimeout(res, 1000 * attempt));
          }
          currentBatch = failedUpdates;
        } else {
          currentBatch = []; // all passed
        }

        attempt++;
      }

      if (currentBatch.length > 0) {
        failedCount += currentBatch.length;
        console.error(`Permanently failed to update ${currentBatch.length} items in chunk ${i / chunkSize + 1}.`);
      }
    }

    return Response.json(
      {
        success: true,
        keysSynced: pendingUpdates.length - failedCount,
        failed: failedCount,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Sync failed:", error);
    return Response.json(
      {
        message: "Sync failed",
        error: true,
      },
      { status: 500 },
    );
  }
};
