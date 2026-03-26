import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/send-otp",
        { email }
      );

      if (res.data.success) {
        navigate("/auth/VerifyOtp", { state: { email } });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-6">

        <h1 className="text-3xl text-white text-center mb-6">
          CampusWhisper
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter college email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <button
            type="submit"
            className="w-full p-3 bg-purple-600 text-white rounded cursor-pointer"
          >
            Send OTP
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;