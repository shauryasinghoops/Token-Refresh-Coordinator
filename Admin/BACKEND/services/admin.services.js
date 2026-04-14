import adminModel from "../models/admin.model.js"


export const createAdmin = async ({ email, password, role }) => {
    if (!role) {
        throw new Error("Please Provide Your Role");
    }
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const hashedPassword = await adminModel.hashPassword(password);
    const admin = await adminModel.create({
        email,
        password: hashedPassword,
        role
    })

    return admin;
}