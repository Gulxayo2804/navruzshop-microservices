
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { logger } from "../../../shared/logger/index";
import { ConnectDB } from './config/db';

const PORT = process.env.PORT || 4001;


async function startServer() {
  try {
    await ConnectDB();

    app.listen(PORT, () => {
      logger.info(`Auth service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start auth service", error);
    process.exit(1);
  }
}

startServer();
