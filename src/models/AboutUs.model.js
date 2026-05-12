// backend\src\models\AboutUs.model.js
import db from "../config/db.js";

export const getAboutUs = async () => {
  const [rows] = await db.query("SELECT * FROM tbl_aboutus WHERE id=1");
  return rows[0];
};

export const updateAboutUs = async (data) => {
  const {
    abouttitle,
    aboutSubtitle,
    aboutTagline,
    aboutimg,
    aboutimg_title,
    aboutimg_alt,
    aboutdec,
    aboutdec2,
    mission_desc,
    vision_desc,
    missionimg,
    bannerimg,
    bannerimg_title,
    bannerimg_alt,
    meta_title,
    meta_keyword,
    meta_description,
    ip_address,
    updated_by,
  } = data;
  await db.query(
    `UPDATE tbl_aboutus
     SET  abouttitle=?, aboutSubtitle=?, aboutTagline=?, aboutimg=?, aboutimg_title=?, aboutimg_alt=?, aboutdec=?, aboutdec2=?, mission_desc=?, vision_desc=?, missionimg=?, bannerimg=?, bannerimg_title=?, bannerimg_alt=?, meta_title=?, meta_keyword=?, meta_description=?, ip_address=?, updated_by=?
    WHERE id=1`,
    [
      abouttitle,
      aboutSubtitle,
      aboutTagline,
      aboutimg,
      aboutimg_title,
      aboutimg_alt,
      aboutdec,
      aboutdec2,
      mission_desc,
      vision_desc,
      missionimg,
      bannerimg,
      bannerimg_title,
      bannerimg_alt,
      meta_title,
      meta_keyword,
      meta_description,
      ip_address,
      updated_by,
    ],
  );
};
