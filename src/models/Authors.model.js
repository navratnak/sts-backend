// backend\src\models\Authors.model.js

import db from "../config/db.js";

export const getAllAuthors = async () => {
  const [rows] = await db.query("SELECT * FROM tbl_authors ORDER BY id DESC");
  return rows;
};

// Admin site News views
export const getAllAuthorsForNewsView = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_authors WHERE website_view_status='1' ORDER BY id DESC",
  );
  return rows;
};

export const getAuthorsById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tbl_authors WHERE id=?", [id]);
  return rows[0];
};

export const createAuthors = async (data) => {
  const {
    name,
    number,
    email,
    address,
    designation,
    qualification,
    tagline,
    image,
    image_title,
    image_alt,
    meta_title,
    meta_keyword,
    meta_description,
    created_by,
    permalink,
    ip_address,
  } = data;

  const [result] = await db.query(
    `INSERT INTO tbl_authors
    (name, number, email, address, designation, qualification, tagline,
     image, image_title, image_alt, meta_title, meta_keyword,
     meta_description, ip_address, created_by, permalink)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name || "",
      number || "",
      email || "",
      address || "",
      designation || "",
      qualification || "",
      tagline || "",
      image || null,
      image_title || "",
      image_alt || "",
      meta_title || "",
      meta_keyword || "",
      meta_description || "",
      ip_address || "",
      created_by || "",
      permalink || "",
    ],
  );

  return result.insertId;
};

export const updateAuthors = async (id, data) => {
  const {
    name,
    number,
    email,
    address,
    designation,
    qualification,
    tagline,
    image,
    image_title,
    image_alt,
    meta_title,
    meta_keyword,
    meta_description,
    permalink,
    ip_address,
  } = data;
  await db.query(
    `UPDATE tbl_authors 
     SET name=?, permalink=?, number=?, email=?, address=?, designation=?, qualification=?, tagline=?, image=?, image_title=?, image_alt=?, meta_title=?, meta_keyword=?, meta_description=?, ip_address=?
    WHERE id=?`,
    [
      name,
      permalink,
      number,
      email,
      address,
      designation,
      qualification,
      tagline,
      image,
      image_title,
      image_alt,
      meta_title,
      meta_keyword,
      meta_description,
      ip_address,
      id,
    ],
  );
};

export const deleteAuthors = async (id) => {
  await db.query("DELETE FROM tbl_authors WHERE id=?", [id]);
};

// Clent site News views
export const getAllAuthorsForClient = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_authors WHERE website_view_status='1'",
  );
  return rows;
};
