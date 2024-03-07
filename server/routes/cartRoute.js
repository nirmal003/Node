import express from "express";
import {
  createNewCart,
  getAllCartItems,
  getAllMyCartItems,
} from "../controllers/cartController.js";

const router = express.Router();

router.route("/cart/new").post(createNewCart);

router.route("/carts").get(getAllCartItems);

router.route("/my/carts").get(getAllMyCartItems);

export default router;
