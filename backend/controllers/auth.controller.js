import bcryptjs from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import sendMail from "../helpers/sendMail.js";
// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sethsiripharmacypro@gmail.com",
        pass: "qxqhlxsysbeuiphf",
    },
});
  
export const signup = async (req, res) => {
    const { email, password, name,gender,dob,address } = req.body;

    try {
        if (!email || !password || !name || !gender || !dob || !address) {
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({ email });
        console.log("userAlreadyExists", userAlreadyExists);

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            name,
            gender,
            dob: new Date(dob),  // Convert string to Date
            address,
        });

        await user.save();
        sendMail(
            email,
            "Welcome to Sethsiri Pharamacy",
            "Thank you for signing up!",
            `<h1>Hello ${name},</h1><p>Thank you for registering with Sethsiri Pharmacy - your comprehensive solution for pharmacy inventory management, patient records, and prescription processing.</p>
            
            <p>Your account has been successfully created </p>
           
            <p>For security purposes, we recommend changing your password after your first login.</p>
            
            <p>If you have any questions or need assistance, our support team is available 24/7.</p>
            <br>
            <p>Welcome aboard!</p>
             <p>Best regards,<br>
            Sethsiri Pharmacy Team</p>
            <p>Sethsiri Pharmacy<br>No: 10, Nkumbura Road, Pujapitiya, Kandy, Sri Lanka<br>Phone: 077-3971302 | Email: sethsiripharmacypro@gmail.com
            <br>© 2025 Sethsiri Pharmacy. All rights reserved.</p>
               
                 <p>This email was sent to ${email} because you registered for a Sethsiri Pharmacy account.
                <br>If you didn't create this account, please contact us immediately.</p>`
        );
     
        // jwt
        generateTokenAndSetCookie(user, res);  // Fix the order of parameters

       


        
    } catch (error) {
        console.error("Error in signup: ", error);
        res.status(500).json({ success: false, message: "Signup failed. Please try again." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(user, res);


        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error in login ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({ success: true, message: 'If an account exists, a reset link has been sent' });
        }

        // Generate password reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = Date.now() + 3600000; // 1 hour expiration
        await user.save();

        // Construct reset URL
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        // Send reset email using nodemailer (without sendMail function)
        await transporter.sendMail({
            from: `"Sethsiri Pharmacy" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Request",
            html: `
                <h2>Password Reset</h2>
                <p>You requested a password reset. Click the link below to proceed:</p>
                <a href="${resetUrl}">Reset Password</a>
                <p>This link will expire in 1 hour.</p>
            `,
        });

        res.status(200).json({ success: true, message: "Password reset link sent" });

    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        // Hash new password
        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.log("Error in resetPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

     
  
  

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};