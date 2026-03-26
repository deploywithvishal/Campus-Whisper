import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMe } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/home", protect, getMe);

export default router;