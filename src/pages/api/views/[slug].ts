import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { incrementView, readRedisKey, setIPLockKey } from "@/utils/redis";

export const prerender = false;

const slugs = (await getCollection("blog")).map((post) => post.id);

export const POST: APIRoute = async ({ params, request, cookies }) => {
  const originHeader = request.headers.get("origin") || request.headers.get("referer");
  const hostHeader = request.headers.get("host") || request.headers.get("x-forwarded-host");

  if (!originHeader || !hostHeader) return Response.json({ error: "Forbidden: Request Rejected" }, { status: 403 });

  try {
    const requestOriginHost = new URL(originHeader).host;
    if (requestOriginHost !== hostHeader) {
      return Response.json({ error: "Forbidden: Request rejected" }, { status: 403 });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Forbidden: Malformed Origin" }, { status: 403 });
  }

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

  if (cookies.has(cookieName)) {
    return Response.json(
      {
        message: "Re-fetch from the same user",
        viewCount: parseInt(cookies.get(cookieName)!.value ?? "0"),
      },
      { status: 200 },
    );
  }

  const viewCount = await readRedisKey(redisKey, slug);
  if (viewCount === null) return Response.json({ error: "Internal server error" }, { status: 500 });

  cookies.set(cookieName, String(viewCount), {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
  });

  // fallback for non browser requests
  const rawIp = request.headers.get("x-forwarded-for") || "anonymous";
  const ip = rawIp.split(",")[0].trim();

  const ipHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip)).then((buf) =>
    Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""),
  );

  const ipLockKey = `${import.meta.env.DEV ? "dev:" : ""}blog:ip_lock:${slug}:${ipHash}`;

  try {
    const isNewIpVisit = await setIPLockKey(ipLockKey);

    if (!isNewIpVisit) {
      return Response.json({ message: "Request from the same IP, blocking view count.", viewCount }, { status: 200 });
    }

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
