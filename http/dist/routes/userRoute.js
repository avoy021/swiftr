import express from "express";
import { loginController, logoutController, refreshTokenController, signupController } from "../controllers/userController.js";
const router = express.Router();
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/refresh", refreshTokenController);
router.post("/logout", logoutController);
export default router;
