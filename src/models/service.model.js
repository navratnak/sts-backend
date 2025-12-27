// backend\src\models\service.model.js
import db from "../config/db.js";

export const getAllServices = async () => {
  const [rows] = await db.query(`
    SELECT s.*, c.name as category_name
    FROM tbl_services s
    JOIN tbl_servicecategory c ON c.id = s.category_id
    ORDER BY s.id DESC
  `);
  return rows;
};

export const getServiceById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tbl_services WHERE id=?", [id]);
  return rows[0];
};

export const createService = async (data) => {
  const {
    category_id,
    name,
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
    permalink,
    ip_address,
  } = data;

  const [result] = await db.query(
    `INSERT INTO tbl_services 
     (category_id,name,sub_title,permalink, tagline, description, tagline2, description2, image,image_title,image_alt, banner_image,
    bannerimage_title,bannerimage_alt,meta_title,meta_keyword,meta_description, created_by,ip_address)
     VALUES (?,?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      category_id,
      name,
      sub_title,
      permalink,
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
    ]
  );

  return result.insertId;
};

export const updateService = async (id, data) => {
  const {
    category_id,
    name,
    sub_title,
    permalink,
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
    `UPDATE tbl_services 
     SET category_id=?,name=?,sub_title=?, permalink=?, tagline=?, description=?,tagline2=?,description2=?, image=?, image_title=?, image_alt=?, banner_image=?, bannerimage_title=?, bannerimage_alt=?, meta_title=?, meta_keyword=?, meta_description=?, ip_address=?
     WHERE id=?`,
    [
      category_id,
      name,
      sub_title,
      permalink,
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
    ]
  );
};

export const deleteService = async (id) => {
  await db.query("DELETE FROM tbl_services WHERE id=?", [id]);
};

// Clent site Services views
export const getAllServicesForClient = async () => {
  const [rows] = await db.query(
    ` SELECT s.*, c.name as category_name
    FROM tbl_services s
    JOIN tbl_servicecategory c ON c.id = s.category_id
    WHERE s.website_view_status = '1'
    ORDER BY s.id DESC`
  );
  return rows;
};
