import { Request, Response } from "express";
import { ProductModel } from '../models/product.model';
import { createProductSchema } from '../validators/product.validator';

export const getProducts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter: any = {};
  if (req.query.category) {
    filter.category = req.query.category;
  };

  const products = await ProductModel.find(filter)
    .populate('category')
    .skip(skip)
    .limit(limit);

  const total = await ProductModel.countDocuments(filter);

  res.json({
    page,
    limit,
    total,
    data: products,
  });
}

export const createProduct = async (req: Request, res: Response) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const product = await ProductModel.create(req.body);
  res.status(201).json(product);
};
