import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Email must be at least 6 character long'],
        maxLength: [30, 'Email must not be longer than 30 characters']

    },
    password: {
        type: String,
        select: false,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'Admin'
    },
})

adminSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
};

adminSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

const admin = mongoose.model('admin', adminSchema);

export default admin;