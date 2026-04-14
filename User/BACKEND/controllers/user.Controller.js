import { validationResult } from 'express-validator';
import * as userServices from '../services/user.services.js';
import userModel from '../models/user.model.js';
import jwt, { decode } from "jsonwebtoken";
import user from '../models/user.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7*24*60*60*1000,
    path: "/",
}

const sendAuthResponse = async(user, res) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    await userModel.findByIdAndUpdate(user._id, { refreshToken });
    if(user._doc?.password) delete user._doc.password;

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    return res.status(200).json({user, accessToken});

};



export const createUserController = async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ error : errors.array()})
    }

    try{
        const user = await userServices.createUser(req.body);
        
        return sendAuthResponse(user, res);

    }catch(error){
        res.status(400).send(error.message);
    }
};

export const loginController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()}); 
    }

    try{

        const {email, password} = req.body;

        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({
                "error" : "Invalid Credentials"
            })
        }

        const isMatch = await user.isValidPassword(password);

        if(!isMatch){
            return res.status(401).json({
                "error" : "Invalid Credentials"
            })
        }

        return sendAuthResponse(user, res);

    }catch(err){
        return res.status(400).json({error : "Envalid User"})
    }
};

export const getUserInfo = async(req, res) => {
    res.status(200).send({
        user : req.user
    })
};

export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json({ users });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const refreshTokenController = async(req, res) => {
    const incoming = req.cookies?.refreshToken;
    if(!incoming) return res.status(400).json({error : "Refresh token missing"});

    let decoded;
    try {
        decoded = jwt.verify(incoming, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        // Point 5: Sliding window - fall back to previous secret for refresh token
        if (process.env.JWT_PREVIOUS_REFRESH_SECRET) {
            try {
                decoded = jwt.verify(incoming, process.env.JWT_PREVIOUS_REFRESH_SECRET);
            } catch (prevErr) {
                return res.status(401).json({error : "Invalid refresh token"});
            }
        } else {
            return res.status(401).json({error : "Invalid refresh token"});
        }
    }

    const existingUser = await userModel.findById(decoded.id).select("+refreshToken");
    if(!existingUser || existingUser.refreshToken !== incoming){
        return res.status(401).json({error : "Refresh token mismatch"});
    }

    if(decoded.tokenVersion !== existingUser.tokenVersion){
        return res.status(401).json({error: "Session invalidated. Login again."});
    }

    const newAccessToken = existingUser.generateAccessToken();
    const newRefreshToken = existingUser.generateRefreshToken();
    existingUser.refreshToken = newRefreshToken;
    await existingUser.save();  // updating mongodb with newRefreshToken.

    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);
    return res.status(200).json({accessToken : newAccessToken});
};

export const logoutController = async(req, res) => {
    await userModel.findByIdAndUpdate(req.user._id, {
        $set: { refreshToken: null},
        $inc: { tokenVersion: 1},
    });

    res.clearCookie("refreshToken", refreshCookieOptions);
    return res.status(200).json({ message : "Logged out"});
};

export const getRotationLog = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', '..', 'ROTATION.md');
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "Rotation log not found" });
        }
        const data = fs.readFileSync(filePath, 'utf8');
        res.status(200).json({ log: data });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to fetch rotation log" });
    }
};
