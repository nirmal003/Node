import express from "express";
import {
  deleteUser,
  getAllUser,
  rigisterUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/user/register").post(rigisterUser);

router.route("/users").get(getAllUser);

router.route("/user/:id").delete(deleteUser);

export default router;
