
import { validationResult } from 'express-validator';
import * as userServices from '../services/user.services.js';
import userModel from '../models/user.model.js';


export const createUserController = async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({ error : errors.array()})
    }

    try{
        const user = await userServices.createUser(req.body);
        
        const token = user.generateJWT();

        res.status(200).json({ user, token });

    }catch(error){
        res.status(400).send(error.message);
    }
}

export const loginController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({ errors : errors.array()}); 
    }

    try{

        const {email, password} = req.body;

        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            res.status(401).json({
                "error" : "Invalid Credentials"
            })
        }

        const isMatch = await user.isValidPassword(password);

        if(!isMatch){
            res.status(401).json({
                "error" : "Invalid Credentials"
            })
        }

        const token = await user.generateJWT();

        delete user._doc.password;

        res.status(200).json({user , token});

    }catch(err){

        console.log(err.message);

    }
}

export const getUserInfo = async(req, res) => {
    res.status(200).send({
        user : req.user
    })
}