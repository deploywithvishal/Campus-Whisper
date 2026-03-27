import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const location = useLocation();

  const email = location.state?.email;
  const tempToken = location.state?.tempToken;

  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signup",
        {
          email,
          password,
          gender,
          tempToken,
        }
      );

      console.log(res.data);
      alert("Signup successful");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  if (!email || !tempToken) {
    return <div className="text-white">Invalid access</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-6">

        <h1 className="text-3xl text-white text-center mb-6">
          Complete Signup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            value={email}
            disabled
            className="w-full p-3 rounded bg-gray-700 text-gray-300"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-800 text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button
            type="submit"
            className="w-full p-3 bg-purple-600 text-white rounded"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
};

export default SignUp;