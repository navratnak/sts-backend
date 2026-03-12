// \backend\src\app.js

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import adminAuthRoutes from "./routes/adminAuth.routes.js";
import websiteSettingRoutes from "./routes/websiteSetting.routes.js";
import serviceCategoryRoutes from "./routes/ServiceCategory.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import testimonialRoutes from "./routes/Testimonial.routes.js";
import authorsRoutes from "./routes/Authors.routes.js";
import NewsCategoryRoutes from "./routes/NewsCategory.routes.js";
import NewsRoutes from "./routes/News.routes.js";
import IndustriesRoutes from "./routes/Industries.routes.js";
import CounterRoutes from "./routes/Counter.routes.js";
import ClientRoutes from "./routes/Client.routes.js";
import WorkingProcessRoutes from "./routes/WorkingProcess.routes.js";
import ContactEnqueryRoutes from "./routes/ContactEnquery.routes.js";
import CareersEnqueryRoutes from "./routes/CareersEnquery.routes.js";
import JobsRoutes from "./routes/Jobs.routes.js";

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

//For Admin
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin", websiteSettingRoutes);
app.use("/api/admin", serviceCategoryRoutes);
app.use("/api/admin", serviceRoutes);
app.use("/api/admin", testimonialRoutes);
app.use("/api/admin", authorsRoutes);
app.use("/api/admin", NewsCategoryRoutes);
app.use("/api/admin", NewsRoutes);
app.use("/api/admin", IndustriesRoutes);
app.use("/api/admin", CounterRoutes);
app.use("/api/admin", ClientRoutes);
app.use("/api/admin", WorkingProcessRoutes);
app.use("/api/admin", ContactEnqueryRoutes);
app.use("/api/admin", CareersEnqueryRoutes);
app.use("/api/admin", JobsRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend Running",
  });
});

// For Client

export default app;
