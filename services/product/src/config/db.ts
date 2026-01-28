import mongoose from "mongoose";
import { logger } from '../../../../shared/logger/index';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        logger.info('Mongodb connected on Product services')
        console.log('Mongodb connected')

    } catch (error) {
        logger.error('Mongodb connection error', error);
        console.log('Mongodb connection error', error);
        process.exit(1)
    }
}

export default connectDB;