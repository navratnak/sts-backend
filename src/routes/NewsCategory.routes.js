import express from "express";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  list,
  activeCategories,
  create,
  update,
  remove,
  toggleStatus,
  viewCategoriesForClient,
} from "../controllers/NewsCategory.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";
import { checkDuplicateName } from "../middleware/checkDuplicateName.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/news-category",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("News Category", "View"),
  list,
);

router.get(
  "/news-category-active",
  protect,
  allowRoles("admin", "superadmin"),
  activeCategories,
);
/* CREATE */
router.post(
  "/news-category",
  protect,
  allowRoles("admin", "superadmin"),
  upload("news-category").single("image"),
  activityLogger("News Category", "Create"),
  checkDuplicateName("tbl_newscategory"),
  create,
);

/* UPDATE */
router.put(
  "/news-category/:id",
  protect,
  allowRoles("admin", "superadmin"),
  upload("news-category").single("image"),
  activityLogger("News Category", "Update"),
  checkDuplicateName("tbl_newscategory"),
  update,
);

/* STATUS TOGGLE */
router.patch(
  "/news-category/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("News Category", "Update"),
  toggleStatus,
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/news-category/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("News Category", "Delete"),
  remove,
);

//News Category For Client Router
router.get("/newsCategoryForClient", viewCategoriesForClient);

export default router;
