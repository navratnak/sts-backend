// backend\src\controllers\Industries.controller.js
import fs from "fs";
import path from "path";
import * as Industries from "../models/Industries.model.js";
import { updateStatus } from "../models/updateStatus.model.js";

const BASE_URL = process.env.BASE_URL;
const IMAGE_DIR = "uploads/industries";

export const getIndustries = async (req, res) => {
  const data = await Industries.getAllIndustries();
  res.json({ success: true, data });
};

export const addIndustries = async (req, res) => {
  const image = req.files?.image?.[0]?.filename || null;
  const banner_image = req.files?.banner_image?.[0]?.filename || null;

  const id = await Industries.createIndustries({
    ...req.body,
    image,
    banner_image,
    created_by: req.user.id,
    ip_address: req.ip,
  });

  res.status(201).json({
    success: true,
    message: "Industries Created !",
    id,
  });
};

export const updateIndustries = async (req, res) => {
  const industries = await Industries.getIndustriesById(req.params.id);
  if (!industries) return res.status(404).json({ message: "Not found" });

  let image = industries.image;
  let banner_image = industries.banner_image;

  if (req.files?.image) {
    if (industries.image) {
      const oldPath = path.join(IMAGE_DIR, industries.image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    image = req.files.image[0].filename;
  }

  if (req.files?.banner_image) {
    if (industries.banner_image) {
      const oldPath = path.join(IMAGE_DIR, industries.banner_image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    banner_image = req.files.banner_image[0].filename;
  }

  await Industries.updateIndustries(req.params.id, {
    ...req.body,
    image,
    banner_image,
    ip_address: req.ip,
  });

  res.json({ success: true, message: "Industries Updated !" });
};

export const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await updateStatus("tbl_industries", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const removeIndustries = async (req, res) => {
  const industries = await Industries.getIndustriesById(req.params.id);
  if (!industries) return res.status(404).json({ message: "Not found" });

  // 🔥 DELETE IMAGE FILE
  if (industries.image) {
    const imgPath = path.join(IMAGE_DIR, industries.image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }
  if (industries.banner_image) {
    const imgPath = path.join(IMAGE_DIR, industries.banner_image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }

  await Industries.deleteIndustries(req.params.id);
  res.json({ success: true, message: "Industries Deleted" });
};

// Clent site Industries views
export const viewIndustriesForClient = async (req, res) => {
  try {
    const rows = await Industries.getAllIndustriesForClient();

    const makeImage = (img) =>
      img ? `${BASE_URL}/uploads/industries/${img}` : "";

    const formattedData = rows.map((row) => ({
      id: row.id,
      name: row.name,
      menu_name: row.menu_name,
      sub_title: row.sub_title,
      tagline: row.tagline,
      description: row.description,
      tagline2: row.tagline2,
      description2: row.description2,
      image: makeImage(row.image),
      image_title: row.image_title,
      image_alt: row.image_alt,
      banner_image: makeImage(row.banner_image),
      bannerimage_title: row.bannerimage_title,
      bannerimage_alt: row.bannerimage_alt,
      meta_title: row.meta_title,
      meta_keyword: row.meta_keyword,
      meta_description: row.meta_description,
      slug: row.permalink,
    }));

    res.json({
      success: true,
      base_url: BASE_URL,
      data: formattedData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to load Industries",
    });
  }
};
