import express from "express";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  list,
  create,
  update,
  remove,
  toggleStatus,
  viewCategoriesForClient,
} from "../controllers/ServiceCategory.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/service-category",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Service Category", "View"),
  list
);

/* CREATE */
router.post(
  "/service-category",
  protect,
  allowRoles("admin", "superadmin"),
  upload("service-category").single("image"),
  activityLogger("Service Category", "Create"),
  create
);

/* UPDATE */
router.put(
  "/service-category/:id",
  protect,
  allowRoles("admin", "superadmin"),
  upload("service-category").single("image"),
  activityLogger("Service Category", "Update"),
  update
);

/* STATUS TOGGLE */
router.patch(
  "/service-category/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Service Category", "Update"),
  toggleStatus
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/service-category/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("Service Category", "Delete"),
  remove
);

//Service Category For Client Router
router.get("/serviceCategoryForClient", viewCategoriesForClient);

export default router;
