// backend\src\routes\News.routes.js
import express from "express";

import { allowRoles } from "../middleware/role.middleware.js";

import * as controller from "../controllers/News.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";
import { checkDuplicateName } from "../middleware/checkDuplicateName.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/news",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("News", "View"),
  controller.getNews,
);

/* CREATE */
router.post(
  "/news",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("News", "Create"),
  upload("news").fields([
    { name: "image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 },
  ]),
  checkDuplicateName("tbl_news"),
  controller.addNews,
);

/* UPDATE */
router.put(
  "/news/:id",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("News", "Update"),
  upload("news").fields([
    { name: "image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 },
  ]),
  checkDuplicateName("tbl_news"),
  controller.updateNews,
);

/* STATUS TOGGLE */
router.patch(
  "/news/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("News", "Update"),
  controller.toggleStatus,
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/news/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("News", "Delete"),
  controller.removeNews,
);

//News For Client Router
router.get("/newsForClient", controller.viewNewsForClient);

export default router;
