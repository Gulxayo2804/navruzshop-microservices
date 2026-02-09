import Redis from "ioredis";

if (!process.env.REDIS_HOST) {
  throw new Error("REDIS_HOST is not defined");
}

export const redis = new Redis({
  host: process.env.REDIS_HOST, 
  port: Number(process.env.REDIS_PORT ?? 6379),
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});
