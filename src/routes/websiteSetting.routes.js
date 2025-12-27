//backend\src\routes\websiteSetting.routes.js
import express from "express";

import { allowRoles } from "../middleware/role.middleware.js";

import {
  getWebsiteSetting,
  updateWebsiteSetting,
  viewSiteSettingforAdmin,
  viewSiteSettingforClient,
} from "../controllers/websiteSetting.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/website-setting",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Website-Setting", "View"),
  getWebsiteSetting
);

/* UPDATE */
router.put(
  "/website-setting",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Website-Setting", "Update"),
  upload("site-setting").fields([
    { name: "user_image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "footerlogo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
    { name: "aboutimg", maxCount: 1 },
  ]),
  updateWebsiteSetting
);

//Site Setting For Admin Router
router.get("/siteSettingForAdmin", protect, viewSiteSettingforAdmin);

//Site Setting For Client Router
router.get("/siteSettingForClient", viewSiteSettingforClient);

export default router;
