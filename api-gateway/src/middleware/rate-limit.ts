import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import type { SendCommandFn } from "rate-limit-redis";
import { redis } from "../config/redis";

const sendCommand: SendCommandFn = (
  ...args: [string, ...string[]]
) => {
  return redis.call(...args) as Promise<any>;
};

export const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand,
  }),
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

export const orderLimiter = rateLimit({
  store: new RedisStore({
    sendCommand,
  }),
  windowMs: 1 * 60 * 1000,
  max: 30,
});
