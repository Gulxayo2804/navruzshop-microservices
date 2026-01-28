import { Request, Response, NextFunction } from 'express';

export interface ProductRequest extends Request {
    user?: {
        userId: string,
        role: string
    }
}

export const authContext = (req: ProductRequest, _res: Response, next: NextFunction) => {
    const userId = req.headers['x-user-id'] as string;
    const role = req.headers['x-user-role'] as string;
    if (userId || role) {
        req.user = { userId, role }
    }
    next();
}