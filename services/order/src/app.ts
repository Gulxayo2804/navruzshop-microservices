import express from "express";
import cors from "cors";
import helmet from "helmet";
import orderRoutes from "./routes/order.routes";
import { authContext } from "./middleware/auth-context";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(authContext);

app.use("/orders", orderRoutes);

export default app;
