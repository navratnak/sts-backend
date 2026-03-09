// backend\src\routes\Client.routes.js
import express from "express";
import { allowRoles } from "../middleware/role.middleware.js";

import {
  list,
  create,
  update,
  remove,
  toggleStatus,
  viewClientForClient,
} from "../controllers/Client.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/client",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Client", "View"),
  list,
);

/* CREATE */
router.post(
  "/client",
  protect,
  allowRoles("admin", "superadmin"),
  upload("client").single("image"),
  activityLogger("Client", "Create"),
  create,
);

/* UPDATE */
router.put(
  "/client/:id",
  protect,
  allowRoles("admin", "superadmin"),
  upload("client").single("image"),
  activityLogger("Client", "Update"),
  update,
);

/* STATUS TOGGLE */
router.patch(
  "/client/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Client", "Update"),
  toggleStatus,
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/client/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("Client", "Delete"),
  remove,
);

//Service Category For Client Router
router.get("/clientForClient", viewClientForClient);

export default router;
