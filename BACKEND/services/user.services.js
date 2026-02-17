import userModel from "../models/user.model.js"

export const createUser = async(
    {name, email , password}
) => {
    if(!name){
        throw new Error('Please Enter your name')
    }
    if(!email || !password){
        throw new Error('Email and password are required')
    }

    const hashedPassword = await userModel.hashPassword(password);


    const user = await userModel.create({
        name,
        email,
        password : hashedPassword
    })

    return user;
}