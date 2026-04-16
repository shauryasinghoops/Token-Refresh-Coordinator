import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
 
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: false,
        trim: true,
        maxLength: [50, 'Give Short Name']
    },
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
        enum: ['User'],
        default: 'User'
    },
    refreshToken: {
        type: String,
        default: null,
        select: false, 
    },
    tokenVersion: {
        type: Number,
        default: 0,
    },
})

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        { id: this._id, email: this.email, role: this.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
    );
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        { id: this._id, tokenVersion: this.tokenVersion },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );
};

const user = mongoose.model('user' , userSchema);

export default user;
