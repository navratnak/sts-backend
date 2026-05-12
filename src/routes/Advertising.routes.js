// backend\src\routes\Advertising.routes.js
import express from "express";

import { allowRoles } from "../middleware/role.middleware.js";
import * as controller from "../controllers/Advertising.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";
import { checkDuplicateName } from "../middleware/checkDuplicateName.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/advertising",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Advertising", "View"),
  controller.getAdvertising,
);

/* CREATE */
router.post(
  "/advertising",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Advertising", "Create"),
  upload("advertising").fields([
    { name: "image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 },
  ]),
  checkDuplicateName("tbl_advertising"),
  controller.addAdvertising,
);

/* UPDATE */
router.put(
  "/advertising/:id",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Advertising", "Update"),
  upload("advertising").fields([
    { name: "image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 },
  ]),
  checkDuplicateName("tbl_advertising"),
  controller.updateAdvertising,
);

/* STATUS TOGGLE */
router.patch(
  "/advertising/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Advertising", "Update"),
  controller.toggleStatus,
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/advertising/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("Advertising", "Delete"),
  controller.removeAdvertising,
);

//Advertising For Client Router
router.get("/advertisingForClient", controller.viewAdvertisingForClient);

export default router;
