import mongoose from "mongoose"

const userschema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
    },
    mobile:{
        type: String, 
        trim: true,
    },
    otp:{
        type: String,
    },
    otpExpiry:{
        type: Date,
    }
},{
    timestamps: true
})

const User = mongoose.model("User", userschema)

export { User }