const validateSignup = (req, res, next) => {
    console.log("Request body:", req.body); // Debugging: Log the incoming data

    const { email, password, name ,gender,dob,address} = req.body;
    if (!email || !password || !name ||!gender || !dob || !address) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    next();
};

export default validateSignup;
