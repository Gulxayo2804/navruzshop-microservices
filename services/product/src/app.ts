import express from "express";
import cors from "cors";
import helmet from "helmet";
import productRoutes from "./routes/product.routes";
import { authContext } from "./middleware/auth-context";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(authContext);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/products", productRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "Product service running" });
});

export default app;
