// backend\src\routes\Industries.routes.js
import express from "express";

import { allowRoles } from "../middleware/role.middleware.js";
import * as controller from "../controllers/Industries.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";
import { checkDuplicateName } from "../middleware/checkDuplicateName.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/industries",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Industries", "View"),
  controller.getIndustries,
);

/* CREATE */
router.post(
  "/industries",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Industries", "Create"),
  upload("industries").fields([
    { name: "image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 },
  ]),
  checkDuplicateName("tbl_industries"),
  controller.addIndustries,
);

/* UPDATE */
router.put(
  "/industries/:id",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Industries", "Update"),
  upload("industries").fields([
    { name: "image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 },
  ]),
  checkDuplicateName("tbl_industries"),
  controller.updateIndustries,
);

/* STATUS TOGGLE */
router.patch(
  "/industries/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Industries", "Update"),
  controller.toggleStatus,
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/industries/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("Industries", "Delete"),
  controller.removeIndustries,
);

//Industries For Client Router
router.get("/industriesForClient", controller.viewIndustriesForClient);

export default router;
