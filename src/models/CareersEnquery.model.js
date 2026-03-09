// backend\src\models\CareersEnquery.model.js

import db from "../config/db.js";

export const getAllCareersEnquery = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_job_enquiry ORDER BY id DESC",
  );
  return rows;
};

export const getCareersEnqueryById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tbl_job_enquiry WHERE id=?", [
    id,
  ]);
  return rows[0];
};


export const createCareersEnquery = async (data) => {
  const { name, number, email, subject, document, ip_address } = data;

  const [result] = await db.query(
    `INSERT INTO tbl_job_enquiry
    (name, number, email, subject, document, ip_address)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      name || "",
      number || "",
      email || "",
      subject || "",
      document || "",
      ip_address || "",
    ],
  );

  return result.insertId;
};

export const deleteCareersEnquery = async (id) => {
  await db.query("DELETE FROM tbl_job_enquiry WHERE id=?", [id]);
};
