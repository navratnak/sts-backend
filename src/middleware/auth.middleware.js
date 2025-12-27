// backend\src\middleware\auth.middleware.js

import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({
      success: false,
      message: "Access token missing",
      code: "TOKEN_MISSING",
    });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.accessSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please login again.",
      code: "TOKEN_EXPIRED",
    });
  }
};
