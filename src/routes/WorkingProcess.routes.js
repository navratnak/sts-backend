// backend\src\routes\WorkingProcess.routes.js
import express from "express";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  list,
  create,
  update,
  remove,
  toggleStatus,
  viewWorkingProcessForClient,
} from "../controllers/WorkingProcess.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/workingprocess",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("WorkingProcess", "View"),
  list,
);

/* CREATE */
router.post(
  "/workingprocess",
  protect,
  allowRoles("admin", "superadmin"),
  upload("workingprocess").single("image"),
  activityLogger("WorkingProcess", "Create"),
  create,
);

/* UPDATE */
router.put(
  "/workingprocess/:id",
  protect,
  allowRoles("admin", "superadmin"),
  upload("workingprocess").single("image"),
  activityLogger("WorkingProcess", "Update"),
  update,
);

/* STATUS TOGGLE */
router.patch(
  "/workingprocess/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("WorkingProcess", "Update"),
  toggleStatus,
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/workingprocess/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("WorkingProcess", "Delete"),
  remove,
);

//Service Category For Client Router
router.get("/workingprocessForClient", viewWorkingProcessForClient);

export default router;

