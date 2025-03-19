import axios from 'axios';

export const signup = async (userData) => {
    try {
        // Validate userData here if necessary
        const response = await axios.post('http://localhost:5555/api/auth/signup', userData);
        return response.data;
    } catch (error) {
        console.error('Signup error:', error);
        throw new Error('Signup failed. Please try again.');
    }
};
