import mongoose  from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [ true, 'User name is required' ]
    },
    email : {
        type : String,
        required: [ true, 'User email is required' ],
        unique: true
    },
    password : {
        type : String,
        required: [ true, 'User password is required' ]
    },
    profilePic : {
        type : String,
        required: [ true, 'User profile picture is required' ]
    },
    plans : {
        type : [ mongoose.Schema.Types.ObjectId ],
        ref : 'Plan'    
    },
    refreshToken : {
        type : String ,
        default : null
    }
} , {
    timestamps : true
})

userSchema.pre('save', async function(){
    
    // Check if password is modified or not , if not modified we move further since this pre hook will be called on every save
    if(!this.isModified('password')) return ;
    // Hash the password using bcrypt
    this.password = await bcrypt.hash(this.password, 10);
})

//to check valid password during login 
userSchema.methods.isPasswordValid = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        name : this.name,
        email : this.email,
    },
    // Secret key to sign the token , should be kept in env variables
    process.env.ACCESS_TOKEN_SECRET,
    {   
        // Expiry time of the token
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);