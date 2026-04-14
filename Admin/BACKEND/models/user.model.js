import mongoose from 'mongoose';
 
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
        enum: ['User', 'Admin'],
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

const user = mongoose.model('user' , userSchema);

export default user;