import express from "express";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  list,
  create,
  update,
  remove,
  toggleStatus,
  viewTestimonialForClient,
} from "../controllers/Testimonial.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { activityLogger } from "../middleware/activity.middleware.js";

const router = express.Router();

/* VIEW (Admin + SuperAdmin) */
router.get(
  "/testimonial",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Testimonial", "View"),
  list,
);

/* CREATE */
router.post(
  "/testimonial",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Testimonial", "Create"),
  upload("testimonial").fields([
    { name: "image", maxCount: 1 },
    { name: "brand_logo", maxCount: 1 },
  ]),
  create,
);

/* UPDATE */
router.put(
  "/testimonial/:id",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Testimonial", "Update"),
  upload("testimonial").fields([
    { name: "image", maxCount: 1 },
    { name: "brand_logo", maxCount: 1 },
  ]),
  update,
);

/* STATUS TOGGLE */
router.patch(
  "/testimonial/:id/status",
  protect,
  allowRoles("admin", "superadmin"),
  activityLogger("Testimonial", "Update"),
  toggleStatus,
);

/* DELETE (SUPERADMIN ONLY) */
router.delete(
  "/testimonial/:id",
  protect,
  allowRoles("superadmin"),
  activityLogger("Testimonial", "Delete"),
  remove,
);

//testimonial For Client Router
router.get("/testimonialForClient", viewTestimonialForClient);

export default router;
