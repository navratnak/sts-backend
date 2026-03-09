// backend\src\models\News.model.js
import db from "../config/db.js";

export const getAllNews = async () => {
  const [rows] = await db.query(`
    SELECT 
      n.*, 
      c.name as category_name,
      a.name as author_name
    FROM tbl_news n
    LEFT JOIN tbl_newscategory c ON c.id = n.category_id
    LEFT JOIN tbl_authors a ON a.id = n.authors_id
    ORDER BY n.id DESC
  `);
  return rows;
};

export const getNewsById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tbl_news WHERE id=?", [id]);
  return rows[0];
};

export const createNews = async (data) => {
  const {
    category_id,
    authors_id,
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
    `INSERT INTO tbl_news 
     (category_id,authors_id,name,sub_title,permalink, tagline, description, tagline2, description2, image,image_title,image_alt, banner_image,
    bannerimage_title,bannerimage_alt,meta_title,meta_keyword,meta_description, created_by,ip_address)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      category_id,
      authors_id,
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
    ],
  );

  return result.insertId;
};

export const updateNews = async (id, data) => {
  const {
    category_id,
    authors_id,
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
    `UPDATE tbl_news 
     SET category_id=?,authors_id=?,name=?,sub_title=?, permalink=?, tagline=?, description=?,tagline2=?,description2=?, image=?, image_title=?, image_alt=?, banner_image=?, bannerimage_title=?, bannerimage_alt=?, meta_title=?, meta_keyword=?, meta_description=?, ip_address=?
     WHERE id=?`,
    [
      category_id,
      authors_id,
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
    ],
  );
};

export const deleteNews = async (id) => {
  await db.query("DELETE FROM tbl_news WHERE id=?", [id]);
};

// Clent site News views
export const getAllNewsForClient = async () => {
  const [rows] = await db.query(`
    SELECT 
      n.*, 
      c.name as category_name,
      c.permalink AS category_slug,
      a.name as author_name,
      a.permalink as author_slug
    FROM tbl_news n
    LEFT JOIN tbl_newscategory c ON c.id = n.category_id
    LEFT JOIN tbl_authors a ON a.id = n.authors_id
    WHERE n.website_view_status = '1'
    ORDER BY n.id DESC
  `);
  return rows;
};
