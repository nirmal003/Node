import express from "express";
import {
  createNewVarient,
  getAllVariants,
} from "../controllers/variantController.js";

const router = express.Router();

router.route("/variant/new").post(createNewVarient);

router.route("/variants").get(getAllVariants);

// router.route("/variant/:id").delete(deleteVariant);

export default router;
