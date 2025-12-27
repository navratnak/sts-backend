import { logActivity } from "../models/AdminActivity.model.js";

export const activityLogger = (module, action) => {
  return async (req, res, next) => {
    res.on("finish", async () => {
      if (![200, 201].includes(res.statusCode)) return;

      try {
        await logActivity({
          admin_id: req.user?.id,
          admin_name: req.user?.name,
          role: req.user?.role,
          module,
          action,
          description: `${action} performed on ${module}`,
          ip_address: req.ip,
        });
      } catch (err) {
        console.log("Activity log error:", err.message);
      }
    });

    next();
  };
};
