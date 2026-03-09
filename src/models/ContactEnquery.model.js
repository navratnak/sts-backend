// backend\src\models\ContactEnquery.model.js

import db from "../config/db.js";

export const getAllContactEnquery = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_contact_enquiry ORDER BY id DESC",
  );
  return rows;
};

export const createContactEnquery = async (data) => {
  const { name, number, email, subject, description, ip_address } =
    data;

  const [result] = await db.query(
    `INSERT INTO tbl_contact_enquiry
    (name, number, email, subject, description, ip_address)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      name || "",
      number || "",
      email || "",
      subject || "",
      description || "",
      ip_address || "",
    ],
  );

  return result.insertId;
};

export const deleteContactEnquery = async (id) => {
  await db.query("DELETE FROM tbl_contact_enquiry WHERE id=?", [id]);
};
