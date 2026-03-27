import { generateOTP, saveOTP } from "../services/otp.service.js";
import { sendOTPEmail } from "../utils/sendEmail.js";
import OTP from "../models/otp.model.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import cors from "cors";


// Instead of this use Redis
const tempStore = new Map();

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = generateOTP();

    await saveOTP(email, otp);
    await sendOTPEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email & OTP required" });
    }

    const record = await OTP.findOne({ email });

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await OTP.deleteMany({ email });

    // 🔐 generate temp token
    const tempToken = Math.random().toString(36).substring(2);

    // store token (5 min validity)
    tempStore.set(email, {
      token: tempToken,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "OTP verified",
      tempToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "OTP verification failed",
      error: error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password, gender, tempToken } = req.body;

    if (!email || !password || !gender || !tempToken) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 🔐 validate temp token
    const stored = tempStore.get(email);

    if (!stored) {
      return res.status(400).json({ message: "No verification found" });
    }

    if (stored.token !== tempToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (stored.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Token expired" });
    }

    // remove after use
    tempStore.delete(email);

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🎯 username generator
    const username =
      gender === "male"
        ? "Mr_" + Math.floor(Math.random() * 10000)
        : "Ms_" + Math.floor(Math.random() * 10000);

    const user = await User.create({
      email,
      password: hashedPassword,
      gender,
      username,
      isVerified: true,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    console.log("Before DB");
    const user = await User.findOne({ email });
    console.log("After DB");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    const safeUser = {
      _id: user._id,
      email: user.email,
      gender: user.gender,
    };

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
