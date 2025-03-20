const validateSignup = (req, res, next) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    next();
};

export default validateSignup;
