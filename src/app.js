// \backend\src\app.js

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import adminAuthRoutes from "./routes/adminAuth.routes.js";
import serviceCategoryRoutes from "./routes/ServiceCategory.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import websiteSettingRoutes from "./routes/websiteSetting.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("trust proxy", 1);

const allowedOrigins = [
  "https://360websolution.es",
  "https://360websolution.es/admin",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend Live 🚀" });
});

//For Admin
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin", serviceCategoryRoutes);
app.use("/api/admin", serviceRoutes);
app.use("/api/admin", websiteSettingRoutes);

// For Client

export default app;
