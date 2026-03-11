import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const isLoggedIn = asyncHandler(async(req, res, next) => {
        const token = req.cookies?.token

        console.log("TOken found")

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken._id)

        if (!user) {
            console.log(" User not found for ID:", decodedToken._id);
            throw new ApiError(401, "Invalid Access Token");
        }

        console.log("cookie:", req.cookies);

        req.user = user
        next();
})