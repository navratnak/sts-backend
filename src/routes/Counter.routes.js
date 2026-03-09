import express from "express";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  list,
  create,
  update,
  remove,
  toggleStatus,
  viewCounterForClient,
} from "../controllers/Counter.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/counter",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Counter", "View"),
  list,
);

/* CREATE */
router.post(
  "/counter",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Counter", "Create"),
  create,
);

/* UPDATE */
router.put(
  "/counter/:id",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Counter", "Update"),
  update,
);

/* STATUS TOGGLE */
router.patch(
  "/counter/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Counter", "Update"),
  toggleStatus,
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/counter/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("Counter", "Delete"),
  remove,
);

//counter For Client Router
router.get("/counterForClient", viewCounterForClient);

export default router;
