
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { ConnectDB } from './config/db';

const PORT = process.env.PORT || 4001;


async function startServer() {
  try {
    await ConnectDB();

    app.listen(PORT, () => {
      console.log(`Auth service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start auth service", error);
    process.exit(1);
  }
}

startServer();
