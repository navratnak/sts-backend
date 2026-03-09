// backend/src/models/updateStatus.model.js
import db from "../config/db.js";

const allowedTables = [
  "tbl_services",
  "tbl_servicecategory",
  "tbl_testimonial",
  "tbl_authors",
  "tbl_newscategory",
  "tbl_news",
  "tbl_industries",
  "tbl_counter",
  "tbl_client",
  "tbl_workingprocess",
  "tbl_contact_enquiry",
  "tbl_job_enquiry",
  "tbl_jobs",
];

export const updateStatus = async (tableName, id, status) => {
  if (!allowedTables.includes(tableName)) {
    throw new Error("Invalid table name");
  }
  await db.query(`UPDATE ${tableName} SET website_view_status=? WHERE id=?`, [
    status,
    id,
  ]);
};
