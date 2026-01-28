import express from "express";
import cors from "cors";
import helmet from "helmet";
import productRoutes from "./routes/product.routes";
import { authContext } from "./middleware/auth-context";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(authContext);

app.use("/products", productRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "Product service running" });
});

export default app;
