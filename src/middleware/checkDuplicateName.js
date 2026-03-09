import db from "../config/db.js";
import { slugify } from "../utils/slugify.js";

export const checkDuplicateName = (table) => {
  return async (req, res, next) => {
    try {
      const { name, permalink } = req.body;

      if (!name || name.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      }

      // 🔥 If user sends custom permalink use that, else auto generate
      const finalSlug =
        permalink && permalink.trim() !== ""
          ? slugify(permalink)
          : slugify(name);

      const excludeId = req.params.id || null;

      let query = `
        SELECT id FROM ${table}
        WHERE (name = ? OR permalink = ?)
      `;

      let values = [name, finalSlug];

      if (excludeId) {
        query += " AND id != ?";
        values.push(excludeId);
      }

      const [rows] = await db.query(query, values);

      if (rows.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Name or Permalink already exists",
        });
      }

      // ✅ only set final slug
      req.body.permalink = finalSlug;

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Duplicate check failed",
      });
    }
  };
};
