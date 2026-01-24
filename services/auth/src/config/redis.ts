import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  retryStrategy(times) {
    const delay = Math.min(times * 500, 5000);
    console.log(`Redis retry #${times} in ${delay}ms`);
    return delay;
  },
});

redis.on("connect", () => {
  console.log("Redis connected (API Gateway)");
});

redis.on("error", (err: Error) => {
  console.error("Redis error:", err);
});
