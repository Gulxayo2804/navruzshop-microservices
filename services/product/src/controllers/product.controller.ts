import { Request, Response } from "express";
import { ProductModel } from '../models/product.model';

export const getProducts = async (req: Request, res: Response) => {
    const products = await ProductModel.find().populate('category');
    res.json(products)
}

export const createProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.create(req.body);
  res.status(201).json(product);
};
