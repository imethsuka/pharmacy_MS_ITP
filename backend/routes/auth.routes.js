import express from "express";
import multer from "multer";
import path from "path";
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

// Configure multer for file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({ storage: storage });

router.get("/check-auth", authenticateUser, checkAuth);

router.post("/signup", validateSignup, signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

// Profile update route with file upload
router.put("/profile/update", authenticateUser, upload.single('profilePicture'), updateProfile);

router.get("/verify-email/:token", verifyEmail);

export default router;