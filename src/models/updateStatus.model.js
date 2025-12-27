// backend/src/models/updateStatus.model.js
import db from "../config/db.js";

const allowedTables = ["tbl_services", "tbl_servicecategory", "tbl_industries"];

export const updateStatus = async (tableName, id, status) => {
  if (!allowedTables.includes(tableName)) {
    throw new Error("Invalid table name");
  }
  await db.query(`UPDATE ${tableName} SET website_view_status=? WHERE id=?`, [
    status,
    id,
  ]);
};
