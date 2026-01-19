import mongoose from "mongoose";
import { logger } from '../../../../shared/logger/index';

export const ConnectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("MONGO_URI is not defined");
    }
    try {
        await mongoose.connect(mongoUri)
        logger.info("MongoDB connected (Auth Service)");
    } catch (error) {
        logger.error('Mongodb filed', error);
        process.exit(1);
    }
}