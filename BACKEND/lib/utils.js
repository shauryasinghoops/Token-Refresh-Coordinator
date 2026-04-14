import jwt from 'jsonwebtoken'


export const generateToken = (adminId, res) => {
    const token = jwt.sign({adminId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true,  // Prevents JavaScript from accessing the cookie and Protects against XSS attacks.
        sameSite: "strict", // not know but it prevent csrf attacks.
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
};