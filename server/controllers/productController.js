import createAsyncError from "../middleware/createAsyncError.js";
import Product from "../models/productModel.js";

export const createNewProduct = createAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({ success: true, product });
});

export const getAllProducts = createAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({ success: true, products });
});
