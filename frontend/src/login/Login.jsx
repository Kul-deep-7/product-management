import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user, authLoading } = useAuth();

    if (authLoading) return null;
    if (user) return <Navigate to="/home" replace />;

    const isEmail = (val) => val.includes("@");

    const handleLogin = async () => {
        if (!input.trim()) {
            setError("Please enter your email or phone number");
            return;
        }
        setError("");
        setLoading(true);

        const isEmailInput = isEmail(input);
        try {
            const payload = isEmailInput
                ? { email: input.trim() }
                : { mobile: input.trim() };

            const res = await axios.post(`${API_URL}/sendotp`, payload, {
                withCredentials: true,
            });

            console.log("OTP:", res.data.data.otp);
            alert(`OTP: ${res.data.data.otp}\n\nPLEASE CLICK OK TO CONTINUE`);

            navigate("/otp", {
                state: isEmailInput
                    ? { email: input.trim() }
                    : { mobile: input.trim() },
            });

        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <div className="flex items-center justify-start">
                <div className="w-[40vw] h-screen rounded-3xl flex flex-col justify-end">
                    <img src="https://res.cloudinary.com/dlmbyyh5z/image/upload/v1773216887/Frame_2_zv06bb.png"
                        className="w-full h-[99vh] object-contain py-6"
                    />
                </div>
            </div>

            <div className="w-1/2 flex flex-col items-center justify-center bg-white px-16">
                <div className="w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Login to your Productr Account
                    </h1>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email or Phone number
                        </label>
                        <input
                            type="text"
                            placeholder="Enter email or phone number"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full mt-4 py-2.5 rounded-md text-white text-sm font-semibold transition-opacity disabled:opacity-70"
                        style={{ background: "#002283" }}
                    >
                        {loading ? "Sending OTP..." : "Login"}
                    </button>

                    <div className="mt-50 border border-gray-200 rounded-md px-4 py-3 text-center">
                        <p className="text-xs text-gray-400">Don't have a Productr Account</p>
                        <p className="text-black cursor-pointer">SignUp Here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;