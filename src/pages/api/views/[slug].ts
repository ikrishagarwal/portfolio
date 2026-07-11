import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { incrementView, readRedisKey } from "@/utils/redis";

export const prerender = false;

const slugs = (await getCollection("blog")).map((post) => post.id);

export const POST: APIRoute = async ({ params, cookies }) => {
  const { slug } = params;

  if (!slug || !slugs.includes(slug))
    return Response.json(
      {
        message: "Slug is invalid",
        error: true,
      },
      { status: 404 },
    );

  const cookieName = `update_lock_${slug}`;
  const redisKey = `${import.meta.env.DEV ? "dev:" : ""}blog:views:${slug}`;
  const viewCount = await readRedisKey(redisKey, slug);

  if (cookies.has(cookieName)) {
    return Response.json(
      {
        message: "Re-fetch from the same user",
        viewCount,
      },
      { status: 200 },
    );
  }

  cookies.set(cookieName, "true", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
  });

  try {
    const fetchedViewCount = await incrementView(redisKey, viewCount);
    if (fetchedViewCount === null) throw new Error("Got null while incrementing redis key");

    return Response.json(
      {
        message: "Your view is counted",
        counted: true,
        viewCount: fetchedViewCount,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Redis increment failed:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
