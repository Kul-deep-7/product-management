import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Otp from "./login/Otp";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/home" element={<Home />} />

    </Routes>
  );
};

export default App;