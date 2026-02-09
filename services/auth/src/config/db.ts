import mongoose from "mongoose";

export const ConnectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("MONGO_URI is not defined");
    }
    try {
        await mongoose.connect(mongoUri)
        console.log("MongoDB connected (Auth Service)");
    } catch (error) {
        console.error('Mongodb filed', error);
        process.exit(1);
    }
}