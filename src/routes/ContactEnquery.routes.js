// backend\src\routes\ContactEnquery.routes.js
import express from "express";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  list,
  create,
  toggleStatus,
  remove,
} from "../controllers/ContactEnquery.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/contact-enquery",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("ContactEnquery", "View"),
  list,
);

/* CREATE */
router.post("/contact-enquery", create);

/* STATUS TOGGLE */
router.patch(
  "/contact-enquery/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Contact Enquery", "Update"),
  toggleStatus,
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/contact-enquery/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("ContactEnquery", "Delete"),
  remove,
);

export default router;
