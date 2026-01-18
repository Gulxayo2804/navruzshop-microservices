import Redis from 'ioredis';
import { logger } from '../../../../shared/logger/index';

export const redis = new Redis({
    host: 'localhost',
    port: 6379
});

redis.on("connect", () => {
    logger.info('Redis connected')
});

redis.on("error", (err) => {
    logger.error("Redis error", err)
})
