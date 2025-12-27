import db from "../config/db.js";

export const findAdminByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT id, name, email, password, role, status FROM admins WHERE email = ? AND status = 1",
    [email]
  );
  return rows[0];
};

export const saveRefreshToken = async (adminId, token) => {
  await db.query("UPDATE admins SET refresh_token = ? WHERE id = ?", [
    token,
    adminId,
  ]);
};

export const findAdminByRefreshToken = async (token) => {
  const [rows] = await db.query(
    "SELECT id, name, email, role FROM admins WHERE refresh_token = ?",
    [token]
  );
  return rows[0];
};
