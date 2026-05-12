
//backend\src\routes\AboutUs.routes.js
import express from "express";

import { allowRoles } from "../middleware/role.middleware.js";

import {
  getSiteAboutUs,
  updateSiteAboutUs,
  viewSiteAboutUsforAdmin,
  viewSiteAboutUsforClient,
} from "../controllers/AboutUs.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/about-us",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("about-us", "View"),
  getSiteAboutUs,
);

/* UPDATE */
router.put(
  "/about-us",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("about-us", "Update"),
  upload("about-us").fields([
    { name: "bannerimg", maxCount: 1 },
    { name: "missionimg", maxCount: 1 },
    { name: "aboutimg", maxCount: 1 },
  ]),
  updateSiteAboutUs,
);

//Site Setting For Admin Router
router.get("/aboutUsForAdmin", protect, viewSiteAboutUsforAdmin);

//Site Setting For Client Router
router.get("/aboutUsForClient", viewSiteAboutUsforClient);

export default router;
