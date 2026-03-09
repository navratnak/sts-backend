// backend\src\controllers\Authors.controller.js
import fs from "fs";
import path from "path";
import * as Authors from "../models/Authors.model.js";
import { slugify } from "../utils/slugify.js";
import { updateStatus } from "../models/updateStatus.model.js";

const BASE_URL = process.env.BASE_URL;
const IMAGE_DIR = "uploads/authors";

export const list = async (req, res) => {
  const data = await Authors.getAllAuthors();
  res.json({ success: true, data });
};

export const activeAuthors = async (req, res) => {
  const data = await Authors.getAllAuthorsForNewsView();
  res.json({ success: true, data });
};

export const create = async (req, res) => {
  const image = req.file ? req.file.filename : null;
  const permalink = slugify(req.body.name);

  const id = await Authors.createAuthors({
    ...req.body,
    permalink,
    image,
    created_by: req.user.id,
    ip_address: req.ip,
  });

  res.status(201).json({
    success: true,
    message: "Authors Created!",
    id,
  });
};

export const update = async (req, res) => {
  const authors = await Authors.getAuthorsById(req.params.id);
  if (!authors) return res.status(404).json({ message: "Not found" });

  let image = authors.image;

  // NEW IMAGE UPLOADED
  if (req.file) {
    // 🔥 DELETE OLD IMAGE
    if (authors.image) {
      const oldPath = path.join(IMAGE_DIR, authors.image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    image = req.file.filename;
  }

  const permalink = slugify(req.body.name);

  await Authors.updateAuthors(req.params.id, {
    ...req.body,
    image,
    permalink,
    ip_address: req.ip,
  });

  res.json({ success: true, message: "Authors Updated!" });
};

export const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await updateStatus("tbl_authors", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const remove = async (req, res) => {
  const authors = await Authors.getAuthorsById(req.params.id);
  if (!authors) return res.status(404).json({ message: "Not found" });

  // 🔥 DELETE IMAGE FILE
  if (authors.image) {
    const imgPath = path.join(IMAGE_DIR, authors.image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }

  await Authors.deleteAuthors(req.params.id);
  res.json({ success: true, message: "Authors Deleted!" });
};

// Clent site Service Caegory views
export const viewAuthorsForClient = async (req, res) => {
  try {
    const rows = await Authors.getAllAuthorsForClient();

    const makeImage = (img) =>
      img ? `${BASE_URL}/uploads/authors/${img}` : "";

    const formattedData = rows.map((row) => ({
      id: row.id,
      name: row.name,
      number: row.number,
      email: row.email,
      address: row.address,
      designation: row.designation,
      qualification: row.qualification,
      tagline: row.tagline,
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
      message: "Failed to load Authors",
    });
  }
};
