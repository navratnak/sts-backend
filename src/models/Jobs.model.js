// backend\src\models\Jobs.model.js

import db from "../config/db.js";

export const getAllJobs = async () => {
  const [rows] = await db.query("SELECT * FROM tbl_jobs ORDER BY id DESC");
  return rows;
};

export const getJobsById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tbl_jobs WHERE id=?", [id]);
  return rows[0];
};

export const createJobs = async (data) => {
  const {
    name,
    experience,
    no_of_post,
    salary,
    Industry_type,
    employment_type,
    department,
    education,
    post_role,
    key_skills,
    description,
    created_by,
    permalink,
    ip_address,
  } = data;

  const [result] = await db.query(
    "INSERT INTO tbl_jobs (`name`, `permalink`, `experience`, `no_of_post`, `salary`, `Industry_type`, `employment_type`, `department`, `education`, `post_role`, `key_skills`, `description`, `ip_address`, `created_by`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name || "",
      permalink || "",
      experience || "",
      no_of_post || "",
      salary || "",
      Industry_type || "",
      employment_type || "",
      department || "",
      education || "",
      post_role || "",
      key_skills || "",
      description || "",
      ip_address || "",
      created_by || "",
    ],
  );

  return result.insertId;
};

export const updateJobs = async (id, data) => {
  const {
    name,
    experience,
    no_of_post,
    salary,
    Industry_type,
    employment_type,
    department,
    education,
    post_role,
    key_skills,
    description,
    permalink,
    ip_address,
  } = data;
  await db.query(
    `UPDATE tbl_jobs 
     SET name=?, permalink=?, experience=?, no_of_post=?, salary=?, Industry_type=?, employment_type=?, department=?, education=?, post_role=?, key_skills=?, description=?, ip_address=?
    WHERE id=?`,
    [
      name,
      permalink,
      experience,
      no_of_post,
      salary,
      Industry_type,
      employment_type,
      department,
      education,
      post_role,
      key_skills,
      description,
      ip_address,
      id,
    ],
  );
};

export const deleteJobs = async (id) => {
  await db.query("DELETE FROM tbl_jobs WHERE id=?", [id]);
};

// Clent site News views
export const getAllJobsForClient = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_jobs WHERE website_view_status='1'",
  );
  return rows;
};
