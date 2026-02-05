import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { redis } from "../config/redis";

export const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 attempts / 15 min
  standardHeaders: true,
  legacyHeaders: false,
});

export const orderLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args),
  }),
  windowMs: 1 * 60 * 1000,
  max: 30, // 30 requests / min
});
