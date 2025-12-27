// \backend\src\app.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import adminAuthRoutes from "./routes/adminAuth.routes.js";
import serviceCategoryRoutes from "./routes/ServiceCategory.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import websiteSettingRoutes from "./routes/websiteSetting.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
  cors({
    origin: ["https://360websolution.es", "https://360websolution.es/admin"],
    credentials: true,
  })
);
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
