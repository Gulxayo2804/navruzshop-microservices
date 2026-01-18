import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { logger } from '../../../../shared/logger/index';
import { hashPassword } from '../utils/password';

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