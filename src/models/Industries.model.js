// backend\src\models\Industries.model.js
import db from "../config/db.js";

export const getAllIndustries = async () => {
  const [rows] = await db.query(
    `SELECT * FROM tbl_industries ORDER BY id DESC`,
  );
  return rows;
};

export const getIndustriesById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tbl_industries WHERE id=?", [
    id,
  ]);
  return rows[0];
};

export const createIndustries = async (data) => {
  const {
    name,
    permalink,
    menu_name,
    sub_title,
    tagline,
    description,
    tagline2,
    description2,
    image,
    image_title,
    image_alt,
    banner_image,
    bannerimage_title,
    bannerimage_alt,
    meta_title,
    meta_keyword,
    meta_description,
    created_by,
    ip_address,
  } = data;

  const [result] = await db.query(
    `INSERT INTO tbl_industries 
     (name,sub_title,permalink, menu_name ,tagline, description, tagline2, description2, image,image_title,image_alt, banner_image,
    bannerimage_title,bannerimage_alt,meta_title,meta_keyword,meta_description, created_by,ip_address)
     VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      sub_title,
      permalink,
      menu_name,
      tagline,
      description,
      tagline2,
      description2,
      image,
      image_title,
      image_alt,
      banner_image,
      bannerimage_title,
      bannerimage_alt,
      meta_title,
      meta_keyword,
      meta_description,
      created_by,
      ip_address,
    ],
  );

  return result.insertId;
};

export const updateIndustries = async (id, data) => {
  const {
    name,
    sub_title,
    permalink,
    menu_name,
    tagline,
    description,
    tagline2,
    description2,
    image,
    image_title,
    image_alt,
    banner_image,
    bannerimage_title,
    bannerimage_alt,
    meta_title,
    meta_keyword,
    meta_description,
    ip_address,
  } = data;
  await db.query(
    `UPDATE tbl_industries 
     SET name=?,sub_title=?, permalink=?, menu_name=?,tagline=?, description=?,tagline2=?,description2=?, image=?, image_title=?, image_alt=?, banner_image=?, bannerimage_title=?, bannerimage_alt=?, meta_title=?, meta_keyword=?, meta_description=?, ip_address=?
     WHERE id=?`,
    [
      name,
      sub_title,
      permalink,
      menu_name,
      tagline,
      description,
      tagline2,
      description2,
      image,
      image_title,
      image_alt,
      banner_image,
      bannerimage_title,
      bannerimage_alt,
      meta_title,
      meta_keyword,
      meta_description,
      ip_address,
      id,
    ],
  );
};

export const deleteIndustries = async (id) => {
  await db.query("DELETE FROM tbl_industries WHERE id=?", [id]);
};

// Clent site Industries views
export const getAllIndustriesForClient = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_industries WHERE website_view_status='1'",
  );
  return rows;
};
