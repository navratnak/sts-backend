// backend\src\models\Testimonial.model.js

import db from "../config/db.js";

export const getAllTestimonial = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_testimonial ORDER BY id DESC",
  );
  return rows;
};

export const getTestimonialById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tbl_testimonial WHERE id=?", [
    id,
  ]);
  return rows[0];
};

export const createTestimonial = async (data) => {
  const {
    name,
    permalink,
    rating,
    designation,
    image,
    image_title,
    image_alt,
    brand_logo,
    brand_logo_alt,
    brand_logo_title,
    meta_title,
    meta_keyword,
    meta_description,
    tagline,
    ip_address,
    created_by,
  } = data;
  const [result] = await db.query(
    "INSERT INTO `tbl_testimonial`(`name`, `permalink`, `rating`, `designation`, `image`, `image_title`, `image_alt`,`brand_logo`, `brand_logo_alt`, `brand_logo_title`,`meta_title`, `meta_keyword`, `meta_description`, `tagline`, `ip_address`, `created_by`) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      permalink,
      rating,
      designation,
      image,
      image_title,
      image_alt,
      brand_logo,
      brand_logo_alt,
      brand_logo_title,
      meta_title,
      meta_keyword,
      meta_description,
      tagline,
      ip_address,
      created_by,
    ],
  );
  return result.insertId;
};

export const updateTestimonial = async (id, data) => {
  const {
    name,
    permalink,
    rating,
    designation,
    image,
    image_title,
    image_alt,
    brand_logo,
    brand_logo_alt,
    brand_logo_title,
    meta_title,
    meta_keyword,
    meta_description,
    tagline,
    ip_address,
  } = data;
  await db.query(
    `UPDATE tbl_testimonial 
     SET name=?, permalink=?, rating=?, designation=?, image=?, image_title=?, image_alt=?, brand_logo=?, brand_logo_alt=?, brand_logo_title=?, meta_title=?, meta_keyword=?, meta_description=?, tagline=?, ip_address=?
    WHERE id=?`,
    [
      name,
      permalink,
      rating,
      designation,
      image,
      image_title,
      image_alt,
      brand_logo,
      brand_logo_alt,
      brand_logo_title,
      meta_title,
      meta_keyword,
      meta_description,
      tagline,
      ip_address,
      id,
    ],
  );
};

export const deleteTestimonial = async (id) => {
  await db.query("DELETE FROM tbl_testimonial WHERE id=?", [id]);
};

// Clent site Testimonial views
export const getAllTestimonialForClient = async () => {
  const [rows] = await db.query(
    "SELECT * FROM tbl_testimonial WHERE website_view_status='1'",
  );
  return rows;
};
