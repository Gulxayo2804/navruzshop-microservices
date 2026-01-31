import { NextFunction, Response } from "express";
import { GatewayRequest } from "./auth.middleware";

export const requireAdmin = (
    req: GatewayRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return res.status(401).json({ messsage: 'Unothorized!' })
    };
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' })
    }
    next()
}