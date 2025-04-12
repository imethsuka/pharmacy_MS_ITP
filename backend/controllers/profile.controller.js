import User from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const updateProfile = async (req, res) => {
    try {
        const { name, gender, dob, address } = req.body;
        const userId = req.userId;

        let updateData = {
            name,
            gender,
            dob: new Date(dob),
            address
        };

        // If there's a file upload, handle it
        if (req.file) {
            const result = await uploadToCloudinary(req.file.path);
            updateData.profilePicture = result.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, select: '-password' }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}; 