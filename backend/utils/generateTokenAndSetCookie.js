import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (res, userId) => {
    const tokenPayload = {
        id: userId,
    };

    // Handle circular structure
    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };

    const token = jwt.sign(JSON.parse(JSON.stringify(tokenPayload, getCircularReplacer())), process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

export default generateTokenAndSetCookie;