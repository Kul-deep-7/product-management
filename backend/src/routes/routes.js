import {Router} from "express";
import { sendOTP, verifyOTP } from "../controllers/auth.controller.js";

const router= Router()

router.route("/send-otp").post(sendOTP)
router.route("/verify-otp").post(verifyOTP)

export default router;