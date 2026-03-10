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

    let user = await User.findOne({
        $or: [{email}, {mobile}]
    })

     if (!user) {
      user = new User({ email, mobile });
    }

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    console.log("Generated OTP:", otp);

    return res.status(200).json(
        new ApiResponse(200, "OTP sent successfully")
    )
})

const verifyOTP = asyncHandler(async (req,res)=>{
    const { email, mobile, otp } = req.body;

    const user = await User.findOne({ $or: [{ email }, { mobile }] });

    if (!user) {
        throw new ApiError(400, "User not found")
    }

    if (user.otp !== otp) {
        throw new ApiError(400, "Invalid OTP")
    }

    if (user.otpExpiry < Date.now()) {
        throw new ApiError(400, "OTP expired")
    }

    return res.status(200).json(
        new ApiResponse(200, "OTP verified successfully")
    )
})

export { sendOTP , verifyOTP}