import jwt from 'jsonwebtoken';
import admin from '../models/admin.model.js';


export const authAdmin = async(req, res , next) => {
    try{
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
        console.log("Auth attempt with token:", token ? "Token present" : "No token found");

        if(!token){
            return res.status(401).json({
                "error" : "Unathorised User"
            })
        }

        let decode;
        try {
            decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            }
            // Point 5: Sliding window - fall back to previous secret
            if (process.env.JWT_PREVIOUS_ACCESS_SECRET) {
                try {
                    decode = jwt.verify(token, process.env.JWT_PREVIOUS_ACCESS_SECRET);
                } catch (prevErr) {
                    return res.status(401).json({ message: "Invalid token here" });
                }
            } else {
                return res.status(401).json({ message: "Invalid token here" });
            }
        }

        console.log("Token decoded successfully for adminId:", decode.adminId);

        const adminDetail = await admin.findById(decode.adminId).select("-password"); 
        
        if(!adminDetail){
            console.log("Admin not found in DB for ID:", decode.adminId);
            return res.status(401).json({"error" : "User Not Found"});
        }

        req.admin = adminDetail;
        next();

    }catch(err){
        console.error("Auth middleware error:", err.message);
        return res.status(400).json({"error" : "Unauthorised Admin"});
    }
}
