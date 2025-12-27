// backend\src\routes\adminAuth.routes.js
import express from "express";
import {
  loginAdmin,
  refreshToken,
  logoutAdmin,
} from "../controllers/AdminAuth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/refresh-token", refreshToken);
router.post("/logout", protect, logoutAdmin);

export default router;
