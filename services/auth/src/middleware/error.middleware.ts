import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.statusCode || 500;

    console.log('Error: ', err.message);

    res.status(status).json({ message: err.message || "Internal Server Error" })
}