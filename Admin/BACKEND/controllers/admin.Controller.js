import { validationResult } from 'express-validator';
import jwt, { decode } from "jsonwebtoken";
import userModel from '../../../BACKEND/models/user.model.js';
import adminModel from '../models/admin.model.js';
import { createAdmin } from '../services/admin.services.js';
import { generateToken } from '../lib/utils.js';

export const createAdminController = async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ error : errors.array()})
    }

    try {
        const admin = await createAdmin(req.body);

        return res.status(200).json({status : "Admin Created"});
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const loginController = async(req , res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    try{
        const {email , password} = req.body;

        const admin = await adminModel.findOne({email}).select('+password');
        if(!admin){
            return res.status(401).json({
                "error" : "Invalid Credentials"
            })
        }

        const isMatch = await admin.isValidPassword(password);

        if(!isMatch){
            return res.status(401).json({
                "error" : "Invalid Credentials"
            })
        }

        generateToken(admin._id, res);

        return res.status(200).json({ status : "login"});
    }catch(err){
        return res.status(400).json({error : "Invalid User"});
    }

};

export const logoutController = async(req, res) => {
    try{
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message : "Logged out successfully"});
    }catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const getAllUsersController = async (req, res) => {
    try {
        if (req.admin.role !== 'Admin') {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }
        const users = await userModel.find({});
        res.status(200).json({ users });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};