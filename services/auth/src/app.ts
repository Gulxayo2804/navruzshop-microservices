import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { logger } from '../../../shared/logger/index';
import authRouter from './routes/auth.routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/auth', authRouter);

app.use('/health', (_req, res) => {
    res.json({ status: "Auth service running" });
})

export default app;