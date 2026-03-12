import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const EnterOTP = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(20);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, authLoading, setUser } = useAuth();

    const { email, mobile } = location.state || {};

    useEffect(() => {
        if (!email && !mobile) {
            navigate("/", { replace: true });
        }
    }, []);

    useEffect(() => {
        if (timer === 0) { setCanResend(true); return; }
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    // ✅ already logged in → redirect to home
    if (authLoading) return null;
    if (user) return <Navigate to="/home" replace />;

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpString = otp.join("");
        if (otpString.length !== 6) {
            setError("Please enter the complete 6-digit OTP");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const payload = email
                ? { email, otp: otpString }
                : { mobile, otp: otpString };

            const res = await axios.post(`${API_URL}/verifyotp`, payload, {
                withCredentials: true,
            });
            setUser(res.data.data); // ✅ update context immediately
            navigate("/home");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP");
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;
        try {
            const payload = email ? { email } : { mobile };
            const res = await axios.post(`${API_URL}/sendotp`, payload, { withCredentials: true });
            console.log("Resend OTP:", res.data.data.otp);
            alert(`New OTP: ${res.data.data.otp}\n\nPLEASE CLICK OK TO CONTINUE`);
            setTimer(20);
            setCanResend(false);
            setOtp(["", "", "", "", "", ""]);
            setError("");
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError("Failed to resend OTP");
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <div className="flex items-center justify-start">
                <div className="w-[40vw] h-screen rounded-3xl flex flex-col justify-end">
                    <img
                        src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773216887/Frame_2_zv06bb.png"
                        className="w-full h-[99vh] object-contain py-6"
                    />
                </div>
            </div>

            <div className="w-1/2 flex flex-col items-center justify-center bg-white px-16">
                <div className="w-full max-w-sm flex flex-col h-full py-16">
                    <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            Login to your Productr Account
                        </h1>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Enter OTP
                            </label>
                            <div className="flex gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-10 h-10 text-center border border-gray-300 rounded-md text-sm font-semibold outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    />
                                ))}
                            </div>
                            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={loading}
                            className="w-full py-2.5 rounded-md text-white text-sm font-semibold transition-opacity disabled:opacity-70"
                            style={{ background: "#002283" }}
                        >
                            {loading ? "Verifying..." : "Enter your OTP"}
                        </button>

                        <p className="text-xs text-center text-gray-400 mt-3">
                            Didn't receive OTP?{" "}
                            <span
                                onClick={handleResend}
                                className={`font-semibold ${canResend ? "text-blue-700 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}
                            >
                                {canResend ? "Resend" : `Resend in ${timer}s`}
                            </span>
                        </p>
                    </div>

                    <div className="mt-auto border border-gray-200 rounded-md px-4 py-3 text-center">
                        <p className="text-xs text-gray-400">Don't have a Productr Account</p>
                        <p className="text-black cursor-pointer">SignUp Here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnterOTP;