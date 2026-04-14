import jwt from 'jsonwebtoken';
import user from '../models/user.model.js';

export const authUser = async (req, res, next) => {
    try{
        const token = req.cookies.accessToken || req.headers.authorization.split(' ')[1];


        if(!token){
            return res.status(401).json({
                "error" : "Unauthorised User"
            })
        }


        try{
            let decode;
            try {
                decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            } catch (err) {
                // Point 5: Sliding window - fall back to previous secret
                if (process.env.JWT_PREVIOUS_ACCESS_SECRET) {
                    try {
                        decode = jwt.verify(token, process.env.JWT_PREVIOUS_ACCESS_SECRET);
                    } catch (prevErr) {
                        throw err; // throw original error if both fail
                    }
                } else {
                    throw err;
                }
            }

            const userDetail = await user.findById(decode.id).select("-password");

            if(!userDetail){
                return res.status(401).json({"error" : "User Not Found"});
            }

            if(decode.tokenVersion !== userDetail.tokenVersion){
                return res.status(401)({ error : "Session invalidated. Login again."});
            }

            req.user = userDetail;
            next();
        }catch(err){
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            }

            console.log(err.message);

            return res.status(401).json({ message: "Invalid token here" });
        }
    }catch(err){
        console.log(err.message)
        return res.status(400).json({"error" : "Unauthorised User"})
    }
}

export const isAdmin = async (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
};