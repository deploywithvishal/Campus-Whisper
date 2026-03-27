import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const prefilledEmail = location.state?.email || "";

  const [formData, setFormData] = useState({
    email: prefilledEmail,
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        formData,
        { withCredentials: true }
      );
      console.log(res.data);
      navigate("/home");
    } catch (error) {
      alert("Invalid credentials:" + error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-semibold text-center mb-6">
      Login
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Login
      </button>
    </form>
  </div>
</div>
  );
};

export default Login;