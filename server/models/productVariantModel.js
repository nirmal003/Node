import mongoose from "mongoose";

const productVeriantSchema = new mongoose.Schema({
  variant_name: {
    type: String,
    required: [true, "Please Enter Variant Name"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [8, "Price cannot be exceed 8 Character"],
  },
  color: {
    type: String,
    required: [true, "Please Enter Product Color"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [4, "Stock cannot be exceed 4 Character"],
    default: 1,
  },
  product_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Variant = mongoose.model("Variant", productVeriantSchema);
export default Variant;
