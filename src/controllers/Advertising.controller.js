// backend\src\controllers\Advertising.controller.js
import fs from "fs";
import path from "path";
import * as Advertising from "../models/Advertising.model.js";
import { updateStatus } from "../models/updateStatus.model.js";

const BASE_URL = process.env.BASE_URL;
const IMAGE_DIR = "uploads/advertising";

export const getAdvertising = async (req, res) => {
  const data = await Advertising.getAllAdvertising();
  res.json({ success: true, data });
};

export const addAdvertising = async (req, res) => {
  const image = req.files?.image?.[0]?.filename || null;
  const banner_image = req.files?.banner_image?.[0]?.filename || null;

  const id = await Advertising.createAdvertising({
    ...req.body,
    image,
    banner_image,
    created_by: req.user.id,
    ip_address: req.ip,
  });

  res.status(201).json({
    success: true,
    message: "Advertising Created !",
    id,
  });
};

export const updateAdvertising = async (req, res) => {
  const advertising = await Advertising.getAdvertisingById(req.params.id);
  if (!advertising) return res.status(404).json({ message: "Not found" });

  let image = advertising.image;
  let banner_image = advertising.banner_image;

  if (req.files?.image) {
    if (advertising.image) {
      const oldPath = path.join(IMAGE_DIR, advertising.image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    image = req.files.image[0].filename;
  }

  if (req.files?.banner_image) {
    if (advertising.banner_image) {
      const oldPath = path.join(IMAGE_DIR, advertising.banner_image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    banner_image = req.files.banner_image[0].filename;
  }

  await Advertising.updateAdvertising(req.params.id, {
    ...req.body,
    image,
    banner_image,
    ip_address: req.ip,
  });

  res.json({ success: true, message: "Advertising Updated !" });
};

export const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await updateStatus("tbl_advertising", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const removeAdvertising = async (req, res) => {
  const advertising = await Advertising.getAdvertisingById(req.params.id);
  if (!advertising) return res.status(404).json({ message: "Not found" });

  // 🔥 DELETE IMAGE FILE
  if (advertising.image) {
    const imgPath = path.join(IMAGE_DIR, advertising.image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }
  if (advertising.banner_image) {
    const imgPath = path.join(IMAGE_DIR, advertising.banner_image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }

  await Advertising.deleteAdvertising(req.params.id);
  res.json({ success: true, message: "Advertising Deleted" });
};

// Clent site Advertising views
export const viewAdvertisingForClient = async (req, res) => {
  try {
    const rows = await Advertising.getAllAdvertisingForClient();

    const makeImage = (img) =>
      img ? `${BASE_URL}/uploads/advertising/${img}` : "";

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
      message: "Failed to load Advertising",
    });
  }
};
