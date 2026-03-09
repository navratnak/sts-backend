// backend\src\routes\CareersEnquery.routes.js
import express from "express";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  list,
  create,
  toggleStatus,
  remove,
} from "../controllers/CareersEnquery.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/careers-enquery",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Careers Enquery", "View"),
  list,
);

/* CREATE */
router.post("/careers-enquery", upload("careers").single("document"), create);

/* STATUS TOGGLE */
router.patch(
  "/careers-enquery/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Careers Enquery", "Update"),
  toggleStatus,
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/careers-enquery/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("Careers Enquery", "Delete"),
  remove,
);

export default router;
