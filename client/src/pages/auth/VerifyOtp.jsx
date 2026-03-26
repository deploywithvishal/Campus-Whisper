import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../services/authService";


const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const email = localStorage.getItem("email");

      const res = await verifyOtp(email, otp);

      localStorage.setItem("token", res.data.token);

      // 👉 OTP ke baad onboarding start
      navigate("/onboarding/gender");
    } catch (err) {
      alert("Invalid OTP: "+err);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}

export default VerifyOtp