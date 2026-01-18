import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { logger } from '../../../shared/logger/index';
import authRouter from './routes/auth.routes';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { authenticate } from "./middleware/auth.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Protected route accessed" });
});

app.use('/auth', authRouter);

app.use('/health', (_req, res) => {
    res.json({ status: "Auth service running" });
})

export default app;