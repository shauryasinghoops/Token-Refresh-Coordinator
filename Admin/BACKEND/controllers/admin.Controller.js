import { validationResult } from 'express-validator';
import adminModel from '../models/admin.model.js';
import userModel from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getRotationLog = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', '..', '..', 'ROTATION.md');
        if (!fs.existsSync(filePath)) {
            return res.status(200).json({ log: "# Rotation Log\nNo logs found yet." });
        }
        const data = fs.readFileSync(filePath, 'utf8');
        res.status(200).json({ log: data });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch rotation log" });
    }
};

export const loginController = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email }).select('+password');
        if (!admin) {
            return res.status(401).json({
                "error": "Invalid Credentials"
            })
        }

        const isMatch = await admin.isValidPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                "error": "Invalid Credentials"
            })
        }

        const token = generateToken(admin._id, res);

        return res.status(200).json({
            status: "login",
            token: token
        });
    } catch (err) {
        return res.status(400).json({ error: "Invalid User" });
    }

};
export const getAllUsersController = async (req, res) => {
    try {

        const users = await userModel.find({});
        res.status(200).json({ users,token:req.token });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};