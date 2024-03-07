import createAsyncError from "../middleware/createAsyncError.js";
import Cart from "../models/cartModel.js";

export const createNewCart = createAsyncError(async (req, res, next) => {
  const cart = await Cart.create(req.body);

  res.status(201).json({ success: true, cart });
});

export const getAllCartItems = createAsyncError(async (req, res, next) => {
  const carts = await Cart.find().populate([
    {
      path: "product_id",
      select: ["variant_name", "color", "price"],
      populate: {
        path: "product_id",
        select: ["name", "description", "category"],
        populate: { path: "user", select: ["name", "email"] },
      },
    },
    {
      path: "user",
      select: ["name", "email"],
    },
  ]);

  res.status(200).json({ success: true, carts });
});

export const getAllMyCartItems = createAsyncError(async (req, res, next) => {
  const carts = await Cart.find(req.user.id);

  res.status(200).json({ success: true, carts });
});
