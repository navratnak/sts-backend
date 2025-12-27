import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const generateAccessToken = (admin) =>
  jwt.sign({ id: admin.id, role: admin.role }, jwtConfig.accessSecret, {
    expiresIn: jwtConfig.accessExpire,
  });

export const generateRefreshToken = (admin) =>
  jwt.sign({ id: admin.id }, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpire,
  });
