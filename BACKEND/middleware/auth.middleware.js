import jwt from 'jsonwebtoken';
import user from '../models/user.model.js';

export const authUser = async (req, res, next) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if(!token){
            return res.status(401).json({
                "error" : "Unauthorised User"
            })
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            const userDetail = await user.findOne({email : decode.email});

            if(!userDetail){
                return res.status(400).json({"error" : "User Not Found"});
            }

            req.user = userDetail;
            next();
        }catch(err){
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            }
            return res.status(401).json({ message: "Invalid token" });
        }
    }catch(err){
        console.log(err.message)
        return res.status(400).json({"error" : "Unauthorised User"})
    }
}