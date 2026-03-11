import { Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Otp from "./login/Otp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
    </Routes>
  );
};

export default App;