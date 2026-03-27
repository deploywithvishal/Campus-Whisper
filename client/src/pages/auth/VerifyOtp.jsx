import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleVerify = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/auth/verify-otp",
      { email, otp }
    );

    if (res.data.success) {
      const tempToken = res.data.tempToken;

      navigate("/auth/SignUp", { 
        state: { email, tempToken } 
      });
    }
  } catch (err) {
    console.error(err);
    alert("Invalid OTP");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-sm shadow-lg">
        
        <h2 className="text-2xl text-white mb-6 text-center">
          Verify OTP
        </h2>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full h-12 px-4 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-purple-500 text-center tracking-widest"
            required
          />

          <button
            type="submit"
            className="w-full h-12 bg-purple-600 text-white rounded-lg"
          >
            Verify
          </button>
        </form>

        <p className="text-slate-400 text-sm mt-4 text-center">
          OTP sent to {email || "your email"}
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;