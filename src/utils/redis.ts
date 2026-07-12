import { blogsTable } from "@/db/schema";
import { Redis } from "@upstash/redis";
import { POSTGRE_DATABASE_URL, UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from "astro:env/server";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

const redis = new Redis({
  token: UPSTASH_REDIS_REST_TOKEN,
  url: UPSTASH_REDIS_REST_URL,
});
const db = drizzle(POSTGRE_DATABASE_URL);

export const readRedisKey = async (key: string, slug: string) => {
  try {
    const viewCount = await redis.get<number | null>(key);
    if (viewCount !== null) return viewCount;

    const results = await db.select().from(blogsTable).where(eq(blogsTable.slug, slug));

    if (results.length === 0) {
      await db.insert(blogsTable).values({ slug, viewCount: 1 });
    }

    const fetchedViewCount = results.length === 0 ? 0 : results[0].viewCount;
    await redis.set(key, fetchedViewCount);

    return fetchedViewCount;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const incrementView = async (key: string, lastRedisRead: Awaited<ReturnType<typeof readRedisKey>>) => {
  if (lastRedisRead === null) return null;
  return redis.incr(key);
};

export const setIPLockKey = (key: string) => {
  return redis.set(key, "true", { nx: true, ex: 600 });
};
