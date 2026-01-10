require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const helmet = require('helmet');
const cors = require('cors');
const {RateLimiterRedis} = require('rate-limiter-flexible');

mongoose.connect(process.env.MONGODB_URL).then(() => {
    logger.info('Connected to mongod');
}).catch(err => {
    logger.error('mongodb connection error', err)
})

// Meddliwares
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    logger.info(`Recieved ${req.method} request to ${req.url}`);
    logger.info(`Request body: ${req.body}`);
    next();
});

