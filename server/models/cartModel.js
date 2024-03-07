import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  product_variant_id: {
    type: String,
    ref: "Variant",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
