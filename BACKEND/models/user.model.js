import mongoose from 'mongoose';
import bcrypt from 'bcrypt';       // password security library convert password into hashed string.
import jwt from 'jsonwebtoken';
 
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true,
        unique: false,
        trim: true,
        maxLength: [50, 'Give Short Name']
    },
    email:{
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Email must be at least 6 character long'],
        maxLength: [30, 'Email must not be longer than 30 characters']

    },
    password: {
        type: String,
        select: false,      // jab user data fetch karo → password automatically nahi aayega
    }
})

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);      // plain password converted into irreversible hashed version before storing it in the database. 
}

userSchema.methods.isValidPassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function(){
    return jwt.sign({email : this.email},
                process.env.JWT_SECRET,
                {expiresIn: '24h'}
            );
}

const user = mongoose.model('user' , userSchema);


export default user;