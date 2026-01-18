import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { logger } from '../../../../shared/logger/index';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import { redis } from "../config/redis";

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const exitUser = await UserModel.findOne({ email });
        if (exitUser) {
            logger.warn('User already exit');
            return res.status(409).json({
                message: "Email already registered",
            });
        }
        const passwordHash = await hashPassword(password);
        const user = new UserModel({
            email,
            passwordHash
        });
        await user.save()
        return res.status(201).json({
            id: user._id,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        });
    } catch (error) {
        logger.error('USer registration error', error)
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = { userId: user._id, role: user.role };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // store refresh token in Redis
        await redis.set(
            `refresh:${user._id}`,
            refreshToken,
            "EX",
            60 * 60 * 24 * 7
        );

        return res.json({
            accessToken,
            refreshToken,
        });
    } catch (error) {
        return res.status(500).json({ message: "Login failed" });
    }
};
