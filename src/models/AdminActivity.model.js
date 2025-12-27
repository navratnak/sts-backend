import db from "../config/db.js";

export const logActivity = async ({
  admin_id,
  admin_name,
  role,
  module,
  action,
  description,
  ip_address,
}) => {
  await db.query(
    `INSERT INTO admin_activity_logs
     (admin_id, admin_name, role, module, action, description, ip_address)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [admin_id, admin_name, role, module, action, description, ip_address]
  );
};

export const getLogs = async () => {
  const [rows] = await db.query(
    "SELECT * FROM admin_activity_logs ORDER BY id DESC"
  );
  return rows;
};
