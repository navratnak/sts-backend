// backend\src\models\Client.model.js

import db from "../config/db.js";

export const getAllClient = async () => {
  const [rows] = await db.query("SELECT * FROM tbl_client ORDER BY id DESC");
  return rows;
};

export const getClientById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tbl_client WHERE id=?", [id]);
  return rows[0];
};

export const createClient = async (data) => {
  const {
    name,
    url,
    image,
    image_title,
    image_alt,
    created_by,
    permalink,
    ip_address,
  } = data;

  const [result] = await db.query(
    `INSERT INTO tbl_client
    (name, url, image, image_title, image_alt, ip_address, created_by, permalink)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name || "",
      url || "",
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

export const updateClient = async (id, data) => {
  const { name, url, image, image_title, image_alt, permalink, ip_address } =
    data;
  await db.query(
    `UPDATE tbl_client 
     SET name=?, url=?, permalink=?, image=?, image_title=?, image_alt=?, ip_address=?
    WHERE id=?`,
    [name, url, permalink, image, image_title, image_alt, ip_address, id],
  );
};

export const deleteClient = async (id) => {
  await db.query("DELETE FROM tbl_client WHERE id=?", [id]);
};

// Clent site News views
export const getAllClientForClient = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_client WHERE website_view_status='1'",
  );
  return rows;
};
