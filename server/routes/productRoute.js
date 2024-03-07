import express from "express";
import {
  createNewProduct,
  getAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/product/new").post(createNewProduct);

router.route("/products").get(getAllProducts);

// router.route("/product/:id").delete(deleteProduct);

export default router;
