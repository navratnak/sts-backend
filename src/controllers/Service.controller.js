// backend\src\controllers\Service.controller.js
import fs from "fs";
import path from "path";
import * as Service from "../models/service.model.js";
import { slugify } from "../utils/slugify.js";
import { updateStatus } from "../models/updateStatus.model.js";

const BASE_URL = process.env.BASE_URL;
const IMAGE_DIR = "uploads/services";

export const getServices = async (req, res) => {
  const data = await Service.getAllServices();
  res.json({ success: true, data });
};

export const addService = async (req, res) => {
  const image = req.files?.image?.[0]?.filename || null;
  const banner_image = req.files?.banner_image?.[0]?.filename || null;

  const permalink = slugify(req.body.name);

  const id = await Service.createService({
    ...req.body,
    permalink,
    image,
    banner_image,
    created_by: req.user.id,
    ip_address: req.ip,
  });

  res.status(201).json({
    success: true,
    message: "Service Created !",
    id,
  });
};

export const updateService = async (req, res) => {
  const service = await Service.getServiceById(req.params.id);
  if (!service) return res.status(404).json({ message: "Not found" });

  let image = service.image;
  let banner_image = service.banner_image;

  if (req.files?.image) {
    if (service.image) {
      const oldPath = path.join(IMAGE_DIR, service.image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    image = req.files.image[0].filename;
  }

  if (req.files?.banner_image) {
    if (service.banner_image) {
      const oldPath = path.join(IMAGE_DIR, service.banner_image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    banner_image = req.files.banner_image[0].filename;
  }

  const permalink = slugify(req.body.name);

  await Service.updateService(req.params.id, {
    ...req.body,
    image,
    banner_image,
    permalink,
    ip_address: req.ip,
  });

  res.json({ success: true, message: "Service Updated !" });
};

export const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await updateStatus("tbl_services", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const removeService = async (req, res) => {
  const service = await Service.getServiceById(req.params.id);
  if (!service) return res.status(404).json({ message: "Not found" });

  // 🔥 DELETE IMAGE FILE
  if (service.image) {
    const imgPath = path.join(IMAGE_DIR, service.image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }
  if (service.banner_image) {
    const imgPath = path.join(IMAGE_DIR, service.banner_image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }

  await Service.deleteCategory(req.params.id);
  res.json({ success: true, message: "Service Deleted" });
};

// Clent site Services views
export const viewServicesForClient = async (req, res) => {
  try {
    const rows = await Service.getAllServicesForClient();

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No services found",
      });
    }

    const makeImage = (img) =>
      img ? `${BASE_URL}/uploads/services/${img}` : "";

    const formattedData = rows.map((row) => ({
      id: row.id,
      category_id: row.category_id,
      category_name: row.category_name,
      name: row.name,
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
      message: "Failed to load services",
    });
  }
};
