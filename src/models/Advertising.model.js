// backend\src\models\Advertising.model.js
import db from "../config/db.js";

export const getAllAdvertising = async () => {
  const [rows] = await db.query(
    `SELECT * FROM tbl_advertising ORDER BY id DESC`,
  );
  return rows;
};

export const getAdvertisingById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tbl_advertising WHERE id=?", [
    id,
  ]);
  return rows[0];
};

export const createAdvertising = async (data) => {
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
    `INSERT INTO tbl_advertising 
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

export const updateAdvertising = async (id, data) => {
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
    `UPDATE tbl_advertising 
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

export const deleteAdvertising = async (id) => {
  await db.query("DELETE FROM tbl_advertising WHERE id=?", [id]);
};

// Clent site Advertising views
export const getAllAdvertisingForClient = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_advertising WHERE website_view_status='1'",
  );
  return rows;
};
