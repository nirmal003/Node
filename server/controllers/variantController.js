import createAsyncError from "../middleware/createAsyncError.js";
import Variant from "../models/productVariantModel.js";

export const createNewVarient = createAsyncError(async (req, res, next) => {
  const variant = await Variant.create(req.body);

  res.status(201).json({ success: true, variant });
});

export const getAllVariants = createAsyncError(async (req, res, next) => {
  const variants = await Variant.find().populate("product_id", [
    "name",
    "description",
    "category",
    "-_id",
  ]);

  res.status(201).json({ success: true, variants });
});
