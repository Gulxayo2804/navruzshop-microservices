// require('dotenv').config();
// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const logger = require('./utils/logger');
// const helmet = require('helmet');
// const cors = require('cors');
// const { RateLimiterRedis } = require('rate-limiter-flexible');
// const Redis = require('ioredis');
// const { rateLimit } = require('express-rate-limit');
// const { RedisStore } = require('rate-limit-redis');
// const errorHandler = require('./middleware/errorHandler');
// const PORT = process.env.PORT || 3001;

// mongoose.connect(process.env.MONGODB_URL).then(() => {
//     logger.info('Connected to mongod');
// }).catch(err => {
//     logger.error('mongodb connection error', err)
// })

// const rediClient = new Redis({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
// });

// // Meddliwares
// app.use(helmet());
// app.use(cors());
// app.use(express.json());

// app.use((req, res, next) => {
//     logger.info(`Recieved ${req.method} request to ${req.url}`);
//     logger.info(`Request body: ${req.body}`);
//     next();
// });

// const rateLimiter = new RateLimiterRedis({
//     storeClient: rediClient,
//     keyPrefix: 'middleware',
//     points: 10,
//     duration: 1
// })

// app.use((req, res, next) => {
//     rateLimiter.consume(req.ip).then(() => { next() }).catch(() => {
//         logger.warn('Request limit exceeded');
//         res.status(429).json({ success: false, message: "too many requests" })
//     })
// })

// //Ip based rate limiting for sensitive endpoints
// const sensitiveEndpointsLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 50,
//     standardHeaders: true,
//     legacyHeaders: false,
//     handler: (req, res) => {
//         logger.warn(`Sensitive endtpoint rate limit exceeded for IP: ${req.ip}`)
//         res.status(429).json({ success: false, message: "too many requests" })
//     },
//     store: new RedisStore({
//         sendCommand: (...args) => rediClient.call(...args)
//     })
// })

// app.use('/api/auth/signup', sensitiveEndpointsLimiter);
// app.use('/api/auth', require('./routes/auth.routes'));

// //error handling middleware
// app.use(errorHandler);

// app.listen(PORT, () => {
//     logger.info(`Auth server running on ${PORT}`)
// })

// process.on('unhandledRejection', (reason, promise) => {
//     logger.error('Unhandler rejection at', promise, "reason: ", reason)
// })


import app from "./app";
import { logger } from "../../../shared/logger/index";

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  logger.info(`Auth service running on port ${PORT}`);
});
