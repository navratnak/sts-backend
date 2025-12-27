import express from "express";

import { allowRoles } from "../middleware/role.middleware.js";

import { protect } from "../middleware/auth.middleware.js";
import { listLogs } from "../controllers/AdminActivity.controller.js";

const router = express.Router();

router.get("/activity-logs", protect, allowRoles("superadmin"), listLogs);

export default router;