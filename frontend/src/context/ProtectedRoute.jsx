import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, authLoading } = useAuth();

    if (authLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-sm text-gray-400">Loading...</p>
            </div>
        );
    }

    if (!user) return <Navigate to="/" replace />;

    return children;
};

export default ProtectedRoute;