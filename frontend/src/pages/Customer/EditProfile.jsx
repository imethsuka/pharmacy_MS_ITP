import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-hot-toast";
import axios from "axios";
import "./EditProfile.css";

const EditProfile = () => {
    const navigate = useNavigate();
    const { user, updateProfile, isLoading } = useAuthStore();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        dob: "",
        address: "",
        profilePicture: null
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                gender: user.gender || "",
                dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
                address: user.address || "",
                profilePicture: user.profilePicture || null
            });
            setPreviewImage(user.profilePicture);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                profilePicture: file
            }));
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('dob', formData.dob);
            formDataToSend.append('address', formData.address);
            
            if (formData.profilePicture instanceof File) {
                formDataToSend.append('profilePicture', formData.profilePicture);
            }

            const response = await updateProfile(formDataToSend);
            
            if (response.success) {
                toast.success(response.message || "Profile updated successfully");
                setTimeout(() => {
                    navigate("/customerdashboard");
                }, 2000);
            } else {
                toast.error(response.message || "Error updating profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="edit-profile-container">
            <div className="edit-profile-form">
                <h2 className="edit-profile-title">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Profile Picture</label>
                        <div className="profile-picture-container">
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Profile preview"
                                    className="profile-picture-preview"
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className="form-textarea"
                        />
                    </div>

                    <div className="button-group">
                        <button
                            type="button"
                            onClick={() => navigate("/customerdashboard")}
                            className="cancel-button"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Updating..." : "Update Profile"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile; 