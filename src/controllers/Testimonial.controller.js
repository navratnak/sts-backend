// backend\src\controllers\Testimonial.controller.js
import fs from "fs";
import path from "path";
import * as Testimonial from "../models/Testimonial.model.js";
import { slugify } from "../utils/slugify.js";
import { updateStatus } from "../models/updateStatus.model.js";

const BASE_URL = process.env.BASE_URL;
const IMAGE_DIR = "uploads/testimonial";
// const image = `${process.env.UPLOAD_BASE_URL}/services/${req.file.filename}`;

export const list = async (req, res) => {
  const data = await Testimonial.getAllTestimonial();
  res.json({ success: true, data });
};

export const create = async (req, res) => {
  const image = req.files?.image?.[0]?.filename || null;
  const brand_logo = req.files?.brand_logo?.[0]?.filename || null;

  const permalink = slugify(req.body.name);

  const id = await Testimonial.createTestimonial({
    ...req.body,
    permalink,
    image,
    brand_logo,
    created_by: req.user.id,
    ip_address: req.ip,
  });

  res.status(201).json({
    success: true,
    message: "Testimonial created",
    id,
  });
};

export const update = async (req, res) => {
  const testimonial = await Testimonial.getTestimonialById(req.params.id);
  if (!testimonial) return res.status(404).json({ message: "Not found" });

  let image = testimonial.image;
  let brand_logo = testimonial.brand_logo;

  // NEW IMAGE UPLOADED
  if (req.files?.image) {
    if (testimonial.image) {
      const oldPath = path.join(IMAGE_DIR, testimonial.image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    image = req.files.image[0].filename;
  }

  if (req.files?.brand_logo) {
    if (testimonial.brand_logo) {
      const oldPath = path.join(IMAGE_DIR, testimonial.brand_logo);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    brand_logo = req.files.brand_logo[0].filename;
  }

  const permalink = slugify(req.body.name);

  await Testimonial.updateTestimonial(req.params.id, {
    ...req.body,
    image,
    brand_logo,
    permalink,
    ip_address: req.ip,
  });

  res.json({ success: true, message: "Testimonial updated" });
};

export const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await updateStatus("tbl_testimonial", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const remove = async (req, res) => {
  const testimonial = await Testimonial.getCategoryById(req.params.id);
  if (!testimonial) return res.status(404).json({ message: "Not found" });

  // 🔥 DELETE IMAGE FILE
  if (testimonial.image) {
    const imgPath = path.join(IMAGE_DIR, testimonial.image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }

  if (testimonial.brand_logo) {
    const imgPath = path.join(IMAGE_DIR, testimonial.brand_logo);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }

  await Testimonial.deleteTestimonial(req.params.id);
  res.json({ success: true, message: "Testimonial deleted" });
};

// Clent site Service Caegory views
export const viewTestimonialForClient = async (req, res) => {
  try {
    const rows = await Testimonial.getAllTestimonialForClient();

    // if (!rows || rows.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No Testimonial found",
    //   });
    // }

    const makeImage = (img) => (img ? `${BASE_URL}/${IMAGE_DIR}/${img}` : "");

    const formattedData = rows.map((row) => ({
      id: row.id,
      name: row.name,
      tagline: row.tagline,
      rating: row.rating,
      designation: row.designation,
      image: makeImage(row.image),
      image_title: row.image_title,
      image_alt: row.image_alt,
      brand_logo: makeImage(row.brand_logo),
      brand_logo_alt: row.brand_logo_alt,
      brand_logo_title: row.brand_logo_title,
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
      message: "Failed to load Testimonial",
    });
  }
};
