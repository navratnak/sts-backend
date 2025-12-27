// backend\src\controllers\ServiceCategory.controller.js
import fs from "fs";
import path from "path";
import * as Category from "../models/ServiceCategory.model.js";
import { slugify } from "../utils/slugify.js";
import { updateStatus } from "../models/updateStatus.model.js";

const BASE_URL = process.env.BASE_URL;
const IMAGE_DIR = "uploads/service-category";

export const list = async (req, res) => {
  const data = await Category.getAllCategories();
  res.json({ success: true, data });
};

export const create = async (req, res) => {
  const image = req.file ? req.file.filename : null;
  const permalink = slugify(req.body.name);

  const id = await Category.createCategory({
    ...req.body,
    permalink,
    image,
    created_by: req.user.id,
    ip_address: req.ip,
  });

  res.status(201).json({
    success: true,
    message: "Service category created",
    id,
  });
};

export const update = async (req, res) => {
  const category = await Category.getCategoryById(req.params.id);
  if (!category) return res.status(404).json({ message: "Not found" });

  let image = category.image;

  // NEW IMAGE UPLOADED
  if (req.file) {
    // 🔥 DELETE OLD IMAGE
    if (category.image) {
      const oldPath = path.join(IMAGE_DIR, category.image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    image = req.file.filename;
  }

  const permalink = slugify(req.body.name);

  await Category.updateCategory(req.params.id, {
    ...req.body,
    image,
    permalink,
    ip_address: req.ip,
  });

  res.json({ success: true, message: "Service category updated" });
};

export const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await updateStatus("tbl_servicecategory", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const remove = async (req, res) => {
  const category = await Category.getCategoryById(req.params.id);
  if (!category) return res.status(404).json({ message: "Not found" });

  // 🔥 DELETE IMAGE FILE
  if (category.image) {
    const imgPath = path.join(IMAGE_DIR, category.image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }

  await Category.deleteCategory(req.params.id);
  res.json({ success: true, message: "Service category deleted" });
};

// Clent site Service Caegory views
export const viewCategoriesForClient = async (req, res) => {
  try {
    const rows = await Category.getAllCategoriesForClient();

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No services Category found",
      });
    }

    const makeImage = (img) =>
      img ? `${BASE_URL}/uploads/service-category/${img}` : "";

    const formattedData = rows.map((row) => ({
      id: row.id,
      name: row.name,
      tagline: row.tagline,
      description: row.description,
      image: makeImage(row.image),
      image_title: row.image_title,
      image_alt: row.image_alt,
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
      message: "Failed to load services Category",
    });
  }
};
