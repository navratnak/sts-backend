// backend\src\models\WorkingProcess.model.js

import db from "../config/db.js";

export const getAllWorkingProcess = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_workingprocess ORDER BY id DESC",
  );
  return rows;
};

export const getWorkingProcessById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tbl_workingprocess WHERE id=?", [
    id,
  ]);
  return rows[0];
};

export const createWorkingProcess = async (data) => {
  const {
    name,
    tagline,
    image,
    image_title,
    image_alt,
    created_by,
    permalink,
    ip_address,
  } = data;

  const [result] = await db.query(
    `INSERT INTO tbl_workingprocess
    (name, tagline, image, image_title, image_alt, ip_address, created_by, permalink)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name || "",
      tagline || "",
      image || null,
      image_title || "",
      image_alt || "",
      ip_address || "",
      created_by || "",
      permalink || "",
    ],
  );

  return result.insertId;
};

export const updateWorkingProcess = async (id, data) => {
  const {
    name,
    tagline,
    image,
    image_title,
    image_alt,
    permalink,
    ip_address,
  } = data;
  await db.query(
    `UPDATE tbl_workingprocess 
     SET name=?, permalink=?,  tagline=?, image=?, image_title=?, image_alt=?, ip_address=?
    WHERE id=?`,
    [name, permalink, tagline, image, image_title, image_alt, ip_address, id],
  );
};

export const deleteWorkingProcess = async (id) => {
  await db.query("DELETE FROM tbl_workingprocess WHERE id=?", [id]);
};

// Clent site News views
export const getAllWorkingProcessForClient = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_workingprocess WHERE website_view_status='1'",
  );
  return rows;
};
