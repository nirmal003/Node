import createAsyncError from "../middleware/createAsyncError.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const rigisterUser = createAsyncError(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({ success: true, user });
});

export const getAllUser = createAsyncError(async (req, res, next) => {
  const user = await User.find();

  if (!user) return next(new ErrorHandler("User is not found", 404));

  res.status(200).json({ success: true, user });
});

export const deleteUser = createAsyncError(async (req, res, next) => {
  const user = await User.deleteOne({ _id: req.params.id });

  res.status(201).json({ success: true, message: "User Deleted Successfully" });
});
