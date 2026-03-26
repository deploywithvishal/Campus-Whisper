import OTP from "../models/otp.model.js";

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const saveOTP = async (email, otp) => {
  await OTP.deleteMany({ email });

  await OTP.create({
    email,
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000
  });
};