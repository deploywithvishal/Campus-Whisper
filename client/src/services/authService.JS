import API from "./api";

export const sendOtp = (email) => {
  return API.post("/send-otp", { email });
};

export const verifyOtp = (email, otp) => {
  return API.post("/verify-otp", { email, otp });
};