// backend\src\routes\service.routes.js
import express from "express";

import { allowRoles } from "../middleware/role.middleware.js";

import * as controller from "../controllers/Service.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/services",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Service", "View"),
  controller.getServices
);

/* CREATE */
router.post(
  "/services",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Service", "Create"),
  upload("services").fields([
    { name: "image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 },
  ]),
  controller.addService
);

/* UPDATE */
router.put(
  "/services/:id",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Service", "Update"),
  upload("services").fields([
    { name: "image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 },
  ]),
  controller.updateService
);

/* STATUS TOGGLE */
router.patch(
  "/services/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Service", "Update"),
  controller.toggleStatus
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/services/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("Service", "Delete"),
  controller.removeService
);

//Service For Client Router
router.get("/servicesForClient", controller.viewServicesForClient);

export default router;
