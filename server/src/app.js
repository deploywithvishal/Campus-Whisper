import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// ✅ CORS (ONLY ONCE, and BEFORE routes)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/", userRoutes);

export default app;