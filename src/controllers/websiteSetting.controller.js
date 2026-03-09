// backend\src\controllers\websiteSetting.controller.js
import fs from "fs";
import path from "path";
import * as Setting from "../models/websiteSetting.model.js";

const BASE_URL = process.env.BASE_URL;
const IMAGE_DIR = "uploads/site-setting";

export const getWebsiteSetting = async (req, res) => {
  const data = await Setting.getSiteSetting();
  res.json({ success: true, data });
};

export const updateWebsiteSetting = async (req, res) => {
  const setting = await Setting.getSiteSetting();
  if (!setting) return res.status(404).json({ message: "Not found" });

  let user_image = setting.user_image;
  let logo = setting.logo;
  let footerlogo = setting.footerlogo;
  let favicon = setting.favicon;
  let aboutimg = setting.aboutimg;

  if (req.files?.user_image) {
    if (setting.user_image) {
      const oldPath = path.join(IMAGE_DIR, setting.user_image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    user_image = req.files.user_image[0].filename;
  }

  if (req.files?.logo) {
    if (setting.logo) {
      const oldPath = path.join(IMAGE_DIR, setting.logo);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    logo = req.files.logo[0].filename;
  }
  if (req.files?.footerlogo) {
    if (setting.footerlogo) {
      const oldPath = path.join(IMAGE_DIR, setting.footerlogo);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    footerlogo = req.files.footerlogo[0].filename;
  }
  if (req.files?.favicon) {
    if (setting.favicon) {
      const oldPath = path.join(IMAGE_DIR, setting.favicon);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    favicon = req.files.favicon[0].filename;
  }
  if (req.files?.aboutimg) {
    if (setting.aboutimg) {
      const oldPath = path.join(IMAGE_DIR, setting.aboutimg);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    aboutimg = req.files.aboutimg[0].filename;
  }

  await Setting.updateSiteSetting({
    ...req.body,
    user_image,
    logo,
    footerlogo,
    favicon,
    aboutimg,
    ip_address: req.ip,
    updated_by: req.user.id,
  });

  res.json({ success: true, message: "Website settings updated" });
};

// Site Setting View For Admin
export const viewSiteSettingforAdmin = async (req, res) => {
  try {
    const data = await Setting.getSiteSetting();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Site setting not found",
      });
    }

    const makeImage = (img) =>
      img ? `${BASE_URL}/uploads/site-setting/${img}` : "";
    // ✅ Frontend friendly response
    res.json({
      success: true,
      data: {
        site_name: data.site_name,
        admin_name: data.admin_name,
        user_image: makeImage(data.user_image),
        logo: makeImage(data.logo),
        footerlogo: makeImage(data.footerlogo),
        favicon: makeImage(data.favicon),
        copyright: data.copyright,
        base_url: BASE_URL,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to load site settings",
    });
  }
};

// Site Setting View For Client
export const viewSiteSettingforClient = async (req, res) => {
  try {
    const data = await Setting.getSiteSetting();
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Site setting not found",
      });
    }
    const makeImage = (img) =>
      img ? `${BASE_URL}/uploads/site-setting/${img}` : "";
    // ✅ Frontend friendly response
    res.json({
      success: true,
      data: {
        logo: makeImage(data.logo),
        logoimg_alt: data.logoimg_alt,
        logoimg_title: data.logoimg_title,
        footerlogo: makeImage(data.footerlogo),
        footerlogo_alt: data.footerlogo_alt,
        footerlogo_title: data.footerlogo_title,
        favicon: makeImage(data.favicon),
        footer_content: data.footer_content,
        address_map: data.address_map,
        mobile: data.mobile,
        mobile2: data.mobile2,
        whatsapp: data.whatsapp,
        email: data.email,
        email2: data.email2,
        address: data.address,
        address2: data.address2,
        copyright: data.copyright,
        facebook: data.facebook,
        instagram: data.instagram,
        twitter: data.twitter,
        telegram: data.telegram,
        youtube: data.youtube,
        linkedin: data.linkedin,
        abouttitle: data.abouttitle,
        aboutSubtitle: data.aboutSubtitle,
        aboutTagline: data.aboutTagline,
        aboutimg: makeImage(data.aboutimg),
        aboutimg_title: data.aboutimg_title,
        aboutimg_alt: data.aboutimg_alt,
        aboutdec: data.aboutdec,
        welcome_title: data.welcome_title,
        welcome_tagline: data.welcome_tagline,
        yearsOf_experience: data.yearsOf_experience,
        happy_customers: data.happy_customers,
        completed_construction: data.completed_construction,
        terms_condition: data.terms_condition,
        return_policy: data.return_policy,
        privacy_policy: data.privacy_policy,
        meta_title: data.meta_title,
        meta_keyword: data.meta_keyword,
        meta_description: data.meta_description,

        base_url: BASE_URL,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to load site settings",
    });
  }
};
