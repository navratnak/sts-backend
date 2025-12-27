// backend\src\controllers\AdminAuth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  findAdminByEmail,
  saveRefreshToken,
  findAdminByRefreshToken,
} from "../models/Admin.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.util.js";
import { jwtConfig } from "../config/jwt.js";
import { logActivity } from "../models/AdminActivity.model.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Email & Password required" });
  const admin = await findAdminByEmail(email);
  if (!admin)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  const accessToken = generateAccessToken(admin);
  const refreshToken = generateRefreshToken(admin);
  await saveRefreshToken(admin.id, refreshToken);
  await logActivity({
    admin_id: admin.id,
    admin_name: admin.name,
    role: admin.role,
    module: "Auth",
    action: "Login",
    description: "Admin logged in",
    ip_address: req.ip,
  });
  res.json({
    success: true,
    message: "Login Successfully!",
    accessToken,
    refreshToken,
    admin: {
      id: admin.id,
      name: admin.name,
      role: admin.role,
    },
  });
};

/* ================= REFRESH TOKEN ================= */
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });
  try {
    const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);
    const admin = await findAdminByRefreshToken(refreshToken);
    if (!admin)
      return res.status(403).json({ message: "Invalid refresh token" });
    const newAccessToken = generateAccessToken(admin);
    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(403).json({ message: "Refresh token expired" });
  }
};

/* ================= LOGOUT ================= */
export const logoutAdmin = async (req, res) => {
  let adminData = null;

  // Try to read token if available
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      adminData = jwt.verify(token, jwtConfig.accessSecret);
    } catch (e) {
      // token expired / invalid → still allow logout
    }
  }

  if (adminData?.id) {
    await saveRefreshToken(adminData.id, null);

    await logActivity({
      admin_id: adminData.id,
      admin_name: adminData.name,
      role: adminData.role,
      module: "Auth",
      action: "Logout",
      description: "Admin logged out",
      ip_address: req.ip,
    });
  }

  res.json({ message: "Logged out successfully" });
};
