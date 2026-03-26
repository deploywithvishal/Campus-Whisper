import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../services/authService.JS";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    try {
      await sendOtp(email);
      localStorage.setItem("email", email);
      navigate("/auth/verify-otp");
    } catch (err) {
      alert("Failed to send OTP: " + err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
        />

        <button
          onClick={handleNext}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Login;
