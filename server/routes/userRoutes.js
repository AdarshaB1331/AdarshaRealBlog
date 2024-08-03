import express from "express";
import {
  createAccount,
  logIn,
  verifyToken,
} from "../controller/userController.js";

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", logIn);
export default router;
