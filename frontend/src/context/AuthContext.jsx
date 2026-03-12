import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL =    "https://product-management-t4f6.onrender.com";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true); // ✅ true until /getme resolves

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${API_URL}/getme`, { withCredentials: true });
            setUser(res.data.data);
        } catch (err) {
            setUser(null);
        } finally {
            setAuthLoading(false);
        }
    };

    useEffect(() => { fetchUser(); }, []);

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        } catch (err) {
            console.log(err);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, authLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);