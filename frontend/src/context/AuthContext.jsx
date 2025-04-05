import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// API base URL - default to localhost if not specified
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    // Check authentication status - memoized to prevent infinite loops
    const checkAuth = useCallback(async () => {
        setIsCheckingAuth(true);
        setError(null);
        try {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                const userData = JSON.parse(userInfo);
                setUser(userData);
            }
            setIsCheckingAuth(false);
        } catch (error) {
            localStorage.removeItem('userInfo');
            setError(null);
            setIsCheckingAuth(false);
        }
    }, []); // Empty dependency array since it doesn't depend on any state/props

    // Check if user is logged in on app load
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // Memoize fetchUserProfile to prevent infinite loops
    const fetchUserProfile = useCallback(async () => {
        if (!user || !user.token) {
            console.error('Cannot fetch profile: No user or token available');
            return { success: false, message: 'Not authenticated' };
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            console.log(`Fetching user profile from: ${API_BASE_URL}/api/auth/profile`);
            const { data } = await axios.get(`${API_BASE_URL}/api/auth/profile`, config);
            console.log("Profile data received:", data);

            // Ensure data has an address object to prevent errors
            if (!data.address) {
                data.address = {};
            }

            // Update the local state and storage with latest data
            const updatedUserInfo = {
                ...data,
                token: user.token,
                phone: data.phone || '',
                address: data.address || {
                    street: '',
                    city: '',
                    state: '',
                    zipCode: ''
                }
            };

            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            setUser(updatedUserInfo);

            return { success: true, data: updatedUserInfo };
        } catch (error) {
            console.error('Profile fetch error:', error);
            return {
                success: false,
                message: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message || 'Failed to fetch profile. Check server connection.'
            };
        }
    }, [user]); // Only depend on user object

    // Register user
    const register = async (userData) => {
        try {
            console.log(`Attempting to register user at: ${API_BASE_URL}/api/auth/register`);
            const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            return { success: true, data };
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.response?.data?.message || "Error signing up");
            return {
                success: false,
                message: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message || 'Server connection failed. Please ensure the backend is running.'
            };
        }
    };

    // Signup user (alternate name for register)
    const signup = async (email, password, name, gender, dob, address) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, { 
                email, password, name, gender, dob, address 
            });
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            setUser(response.data);
            setIsLoading(false);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || "Error signing up");
            setIsLoading(false);
            throw error;
        }
    };

    // Login user
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            console.log(`Attempting to login at: ${API_BASE_URL}/api/auth/login`);
            const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            setIsLoading(false);
            return { success: true, data };
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || "Error logging in");
            setIsLoading(false);
            return {
                success: false,
                message: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message || 'Server connection failed. Please ensure the backend is running.'
            };
        }
    };

    // Logout user
    const logout = () => {
        setIsLoading(true);
        setError(null);
        try {
            localStorage.removeItem('userInfo');
            setUser(null);
            setIsLoading(false);
            navigate('/login');
        } catch (error) {
            setError("Error logging out");
            setIsLoading(false);
        }
    };

    // Update profile
    const updateProfile = async (userData) => {
        setIsLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put(`${API_BASE_URL}/api/auth/profile`, userData, config);
            localStorage.setItem('userInfo', JSON.stringify({
                ...data,
                token: user.token
            }));
            setUser({
                ...data,
                token: user.token
            });
            setIsLoading(false);
            return { success: true, data };
        } catch (error) {
            console.error('Profile update error:', error);
            setError(error.response?.data?.message || "Error updating profile");
            setIsLoading(false);
            return {
                success: false,
                message: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message || 'Server connection failed. Please ensure the backend is running.'
            };
        }
    };

    // Forgot password
    const forgotPassword = async (email) => {
        setIsLoading(true);
        setError(null);
        setMessage(null);
        try {
            const { data } = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
            setMessage(data.message || "Reset instructions sent to your email");
            setIsLoading(false);
            return { success: true, message: data.message };
        } catch (error) {
            setError(error.response?.data?.message || "Error processing request");
            setIsLoading(false);
            return { 
                success: false, 
                message: error.response?.data?.message || "Error processing request" 
            };
        }
    };

    // Reset password
    const resetPassword = async (token, password) => {
        setIsLoading(true);
        setError(null);
        setMessage(null);
        try {
            const { data } = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, { token, password });
            setMessage(data.message || "Password successfully reset");
            setIsLoading(false);
            return { success: true, message: data.message };
        } catch (error) {
            setError(error.response?.data?.message || "Error resetting password");
            setIsLoading(false);
            return { 
                success: false, 
                message: error.response?.data?.message || "Error resetting password" 
            };
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            isLoading,
            isCheckingAuth,
            message,
            login,
            register,
            signup,
            logout,
            updateProfile,
            fetchUserProfile,
            checkAuth,
            forgotPassword,
            resetPassword
        }}>
            {children}
        </AuthContext.Provider>
    );
};
