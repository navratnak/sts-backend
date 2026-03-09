// backend\src\models\Counter.model.js

import db from "../config/db.js";

export const getAllCounter = async () => {
  const [rows] = await db.query("SELECT * FROM tbl_counter ORDER BY id DESC");
  return rows;
};

export const getCounterById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tbl_counter WHERE id=?", [id]);
  return rows[0];
};

export const createCounter = async (data) => {
  const { name, permalink, count, suffix, ip_address, created_by } = data;
  const [result] = await db.query(
    "INSERT INTO `tbl_counter`(`name`, `permalink`, `count`, `suffix`, `ip_address`, `created_by`) VALUES (?, ?, ?, ?, ?, ?)",
    [name, permalink, count, suffix, ip_address, created_by],
  );
  return result.insertId;
};

export const updateCounter = async (id, data) => {
  const { name, permalink, count, suffix, ip_address } = data;
  await db.query(
    `UPDATE tbl_counter 
     SET name=?, permalink=?, count=?, suffix=?,  ip_address=?
    WHERE id=?`,
    [name, permalink, count, suffix, ip_address, id],
  );
};

export const deleteCounter = async (id) => {
  await db.query("DELETE FROM tbl_counter WHERE id=?", [id]);
};

// Clent site Counter views
export const getAllCounterForClient = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_counter WHERE website_view_status='1'",
  );
  return rows;
};
