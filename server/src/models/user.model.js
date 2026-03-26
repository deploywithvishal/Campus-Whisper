import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  gender: String,
  username: String,
  isVerified: { type: Boolean, default: false }
});

export default mongoose.model("User", userSchema);