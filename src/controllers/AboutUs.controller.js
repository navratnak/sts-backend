// backend\src\controllers\AboutUs.controller.js
import fs from "fs";
import path from "path";
import * as AboutUs from "../models/AboutUs.model.js";

const BASE_URL = process.env.BASE_URL;
const IMAGE_DIR = "uploads/about-us";

export const getSiteAboutUs = async (req, res) => {
  const data = await AboutUs.getAboutUs();
  res.json({ success: true, data });
};

export const updateSiteAboutUs = async (req, res) => {
  const aboutus = await AboutUs.getAboutUs();
  if (!aboutus) return res.status(404).json({ message: "Not found" });

  let aboutimg = aboutus.aboutimg;
  let missionimg = aboutus.missionimg;
  let bannerimg = aboutus.bannerimg;

  if (req.files?.missionimg) {
    if (aboutus.missionimg) {
      const oldPath = path.join(IMAGE_DIR, aboutus.missionimg);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    missionimg = req.files.missionimg[0].filename;
  }
  if (req.files?.bannerimg) {
    if (aboutus.bannerimg) {
      const oldPath = path.join(IMAGE_DIR, aboutus.bannerimg);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    bannerimg = req.files.bannerimg[0].filename;
  }
  if (req.files?.aboutimg) {
    if (aboutus.aboutimg) {
      const oldPath = path.join(IMAGE_DIR, aboutus.aboutimg);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    aboutimg = req.files.aboutimg[0].filename;
  }

  await AboutUs.updateAboutUs({
    ...req.body,
    missionimg,
    bannerimg,
    aboutimg,
    ip_address: req.ip,
    updated_by: req.user.id,
  });

  res.json({ success: true, message: "AboutUs updated" });
};

// AboutUs View For Admin
export const viewSiteAboutUsforAdmin = async (req, res) => {
  try {
    const data = await AboutUs.getAboutUs();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "AboutUs not found",
      });
    }

    const makeImage = (img) =>
      img ? `${BASE_URL}/uploads/about-us/${img}` : "";
    // ✅ Frontend friendly response
    res.json({
      success: true,
      data: {
        missionimg: makeImage(data.missionimg),
        bannerimg: makeImage(data.bannerimg),
        base_url: BASE_URL,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to load About Us",
    });
  }
};

// Site AboutUs View For Client
export const viewSiteAboutUsforClient = async (req, res) => {
  try {
    const data = await AboutUs.getAboutUs();
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "About Us not found",
      });
    }
    const makeImage = (img) =>
      img ? `${BASE_URL}/uploads/about-us/${img}` : "";
    // ✅ Frontend friendly response
    res.json({
      success: true,
      data: {
        missionimg: makeImage(data.missionimg),
        bannerimg: makeImage(data.bannerimg),
        bannerimg_alt: data.bannerimg_alt,
        bannerimg_title: data.bannerimg_title,
        abouttitle: data.abouttitle,
        aboutSubtitle: data.aboutSubtitle,
        aboutTagline: data.aboutTagline,
        aboutimg: makeImage(data.aboutimg),
        aboutimg_title: data.aboutimg_title,
        aboutimg_alt: data.aboutimg_alt,
        aboutdec: data.aboutdec,
        aboutdec2: data.aboutdec2,
        vision_desc: data.vision_desc,
        mission_desc: data.mission_desc,
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
      message: "Failed to load site AboutUs",
    });
  }
};
