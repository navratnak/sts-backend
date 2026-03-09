// backend\src\routes\Jobs.routes.js
import express from "express";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  list,
  create,
  update,
  remove,
  toggleStatus,
  viewJobsForClient,
} from "../controllers/Jobs.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/jobs",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Jobs", "View"),
  list,
);

/* CREATE */
router.post(
  "/jobs",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Jobs", "Create"),
  create,
);

/* UPDATE */
router.put(
  "/jobs/:id",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Jobs", "Update"),
  update,
);

/* STATUS TOGGLE */
router.patch(
  "/jobs/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Jobs", "Update"),
  toggleStatus,
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/jobs/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("Jobs", "Delete"),
  remove,
);

//Service Category For Client Router
router.get("/jobsForClient", viewJobsForClient);

export default router;
