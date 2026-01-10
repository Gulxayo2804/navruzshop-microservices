require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const helmet = require('helmet');
const cors = require('cors');
const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');

mongoose.connect(process.env.MONGODB_URL).then(() => {
    logger.info('Connected to mongod');
}).catch(err => {
    logger.error('mongodb connection error', err)
})

const rediClient = new Redis(process.env.REDIS_URL);

// Meddliwares
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Recieved ${req.method} request to ${req.url}`);
    logger.info(`Request body: ${req.body}`);
    next();
});

const rateLimiter = RateLimiterRedis({
    storeClient: rediClient,
    keyPrefix: 'middleware',
    points: 10,
    duration: 1
})

app.use((req,res,next)=>{
    rateLimiter.consume(req.ip).then(()=>{next()}).catch(()=>{
        logger.warn('Request limit exceeded');
        res.status(429).json({success: false, message:"too many requests"})
    })
})