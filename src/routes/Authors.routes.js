// backend\src\routes\Authors.routes.js
import express from "express";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  list,
  activeAuthors,
  create,
  update,
  remove,
  toggleStatus,
  viewAuthorsForClient,
} from "../controllers/Authors.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/authors",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Authors", "View"),
  list,
);

router.get(
  "/authors-active",
  protect,
  allowRoles("admin", "superadmin"),
  activeAuthors,
);

/* CREATE */
router.post(
  "/authors",
  protect,
  allowRoles("admin", "superadmin"),
  upload("authors").single("image"),
  activityLogger("Authors", "Create"),
  create,
);

/* UPDATE */
router.put(
  "/authors/:id",
  protect,
  allowRoles("admin", "superadmin"),
  upload("authors").single("image"),
  activityLogger("Authors", "Update"),
  update,
);

/* STATUS TOGGLE */
router.patch(
  "/authors/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Authors", "Update"),
  toggleStatus,
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/authors/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("Authors", "Delete"),
  remove,
);

//Service Category For Client Router
router.get("/authorsForClient", viewAuthorsForClient);

export default router;
