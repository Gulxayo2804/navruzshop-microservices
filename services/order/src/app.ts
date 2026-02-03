import express from "express";
import cors from "cors";
import helmet from "helmet";
import orderRoutes from "./routes/order.routes";
import { authContext } from "./middleware/auth-context";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(authContext);

app.use("/orders", orderRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
