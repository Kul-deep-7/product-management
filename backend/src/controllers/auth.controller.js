import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"

const sendOTP = asyncHandler(async(req, res)=>{
    const { email, mobile} = req.body;

    if(!email && !mobile){
        throw new ApiError(400, "Email or Mobile number is required")
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // let user = await User.findOne({
    //     $or: [{email}, {mobile}]
    // }) had issue when only 1 field was provided and other was not as the other stayed null so it was always finding the user by null value and not creating new user
    //same issue in verify otp controller
    //Eg for better understanding:
                            // Does ANY condition match?
        // email: "newuser@example.com" === "old@example.com"? .. doesnt match
        // mobile: undefined === null?  yep matches so MongoDB treats them as same (it was finding user by null value so in verify otp it was throwing error cuz it wasnt looking
                                                                                    // and in sedn otp it wasnt creating new user instead null matches the previous (1 and only) user and it was updating otp fro that user)

    let user ;
    if(email){
        user = await User.findOne({email})
    }else{
        user = await User.findOne({mobile})
    }


     if (!user) {
      user = await User.create({ 
        email, 
        mobile,
        otp,
        otpExpiry: Date.now() + 5 * 60 * 1000
     });
    }else {
        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000;
        await user.save();
    }

    console.log("Generated OTP:", otp);

    return res.status(200).json(
        new ApiResponse(200, "OTP sent successfully")
    )
})

const verifyOTP = asyncHandler(async (req,res)=>{
    const { email, mobile, otp } = req.body;

    let user;
    if (email) {
        user = await User.findOne({ email });
    } else {
        user = await User.findOne({ mobile });
    }

    if (!user) {
        throw new ApiError(400, "User not found")
    }

    if (user.otp !== otp) {
        throw new ApiError(400, "Invalid OTP")
    }

    if (user.otpExpiry < Date.now()) {
        throw new ApiError(400, "OTP expired")
    }

    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json(
        new ApiResponse(200, "OTP verified successfully")
    )
})

export { sendOTP , verifyOTP}