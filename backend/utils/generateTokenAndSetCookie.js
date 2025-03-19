import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
    });
};