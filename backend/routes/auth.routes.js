import express from "express";
import {
	login,
	logout,
	signup,
	forgotPassword,
	resetPassword,
	checkAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import validateSignup from "../middlewares/validateSignup.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", validateSignup, signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;