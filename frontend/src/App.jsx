import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Otp from "./login/Otp";
import Home from "./pages/Home";
import Products from "./pages/Products";
import DisplayProducts from "./pages/DisplayProducts";
import ProtectedRoute from "./context/ProtectedRoute";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
       
      <Route path="/products" element={<ProtectedRoute><DisplayProducts /></ProtectedRoute>} />
      <Route path="/products/add" element={<ProtectedRoute><Products /></ProtectedRoute>} />
    </Routes>
  );
};

export default App;