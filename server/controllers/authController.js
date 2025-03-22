const signup = async (req, res) => {
    try {
        // ...existing code...
        const user = await User.create(req.body);
        res.status(201).json({ user });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
