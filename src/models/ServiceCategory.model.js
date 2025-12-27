// backend\src\models\ServiceCategory.model.js

import db from "../config/db.js";

export const getAllCategories = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_servicecategory ORDER BY id DESC"
  );
  return rows;
};

export const getCategoryById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_servicecategory WHERE id=?",
    [id]
  );
  return rows[0];
};

export const createCategory = async (data) => {
  const {
    name,
    tagline,
    description,
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
    `INSERT INTO tbl_servicecategory 
     (name,permalink, tagline, description, image,image_title,image_alt,meta_title,meta_keyword,meta_description, created_by,ip_address)
     VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      permalink,
      tagline,
      description,
      image,
      image_title,
      image_alt,
      meta_title,
      meta_keyword,
      meta_description,
      created_by,
      ip_address,
    ]
  );
  return result.insertId;
};

export const updateCategory = async (id, data) => {
  const {
    name,
    permalink,
    tagline,
    description,
    image,
    image_title,
    image_alt,
    meta_title,
    meta_keyword,
    meta_description,
    ip_address,
  } = data;
  await db.query(
    `UPDATE tbl_servicecategory 
     SET name=?, permalink=?, tagline=?, description=?, image=?, image_title=?, image_alt=?, meta_title=?, meta_keyword=?, meta_description=?, ip_address=?
    WHERE id=?`,
    [
      name,
      permalink,
      tagline,
      description,
      image,
      image_title,
      image_alt,
      meta_title,
      meta_keyword,
      meta_description,
      ip_address,
      id,
    ]
  );
};

export const deleteCategory = async (id) => {
  await db.query("DELETE FROM tbl_servicecategory WHERE id=?", [id]);
};

// Clent site Service Caegory views
export const getAllCategoriesForClient = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_servicecategory WHERE website_view_status='1'"
  );
  return rows;
};
