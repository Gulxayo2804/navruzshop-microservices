import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes";
import { userContext } from "./middleware/auth-context";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(userContext);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", userRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "User service running" });
});

export default app;
