import express from "express";
import {
	login,
	logout,
	signup,
	forgotPassword,
	resetPassword,
	checkAuth,
	updateProfile,
	verifyEmail,
} from "../controllers/auth.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import validateSignup from "../middlewares/validateSignup.js";

const router = express.Router();

router.get("/check-auth", authenticateUser, checkAuth);

router.post("/signup", validateSignup, signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

// Profile update route
router.put("/profile/update", authenticateUser, updateProfile);

router.get("/verify-email/:token", verifyEmail);

export default router;