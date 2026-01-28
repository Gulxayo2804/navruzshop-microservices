import { Request, Response } from "express";
import { ProductModel } from '../models/product.model';

export const getAllProduct = async (req: Request, res: Response) => {
    const products = await ProductModel.find().populate('category');
    res.json(products)
}