// backend\src\controllers\News.controller.js
import fs from "fs";
import path from "path";
import * as News from "../models/News.model.js";
import { slugify } from "../utils/slugify.js";
import { updateStatus } from "../models/updateStatus.model.js";
import { formatDate } from "../utils/dateFormat.js";

const BASE_URL = process.env.BASE_URL;
const IMAGE_DIR = "uploads/news";

export const getNews = async (req, res) => {
  const data = await News.getAllNews();
  res.json({ success: true, data });
};

export const addNews = async (req, res) => {
  const permalink = slugify(req.body.name);

  const image = req.files?.image?.[0]?.filename || null;
  const banner_image = req.files?.banner_image?.[0]?.filename || null;

  const id = await News.createNews({
    ...req.body,
    permalink,
    image,
    banner_image,
    created_by: req.user.id,
    ip_address: req.ip,
  });

  res.status(201).json({
    success: true,
    message: "News Created !",
    id,
  });
};

export const updateNews = async (req, res) => {
  const news = await News.getNewsById(req.params.id);
  if (!news) return res.status(404).json({ message: "Not found" });

  const permalink = slugify(req.body.name);

  let image = news.image;
  let banner_image = news.banner_image;

  if (req.files?.image) {
    if (news.image) {
      const oldPath = path.join(IMAGE_DIR, news.image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    image = req.files.image[0].filename;
  }

  if (req.files?.banner_image) {
    if (news.banner_image) {
      const oldPath = path.join(IMAGE_DIR, news.banner_image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    banner_image = req.files.banner_image[0].filename;
  }

  await News.updateNews(req.params.id, {
    ...req.body,
    image,
    banner_image,
    permalink,
    ip_address: req.ip,
  });

  res.json({ success: true, message: "News Updated !" });
};

export const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await updateStatus("tbl_news", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const removeNews = async (req, res) => {
  const news = await News.getNewsById(req.params.id);
  if (!news) return res.status(404).json({ message: "Not found" });

  // 🔥 DELETE IMAGE FILE
  if (news.image) {
    const imgPath = path.join(IMAGE_DIR, news.image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }
  if (news.banner_image) {
    const imgPath = path.join(IMAGE_DIR, news.banner_image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }

  await News.deleteNews(req.params.id);
  res.json({ success: true, message: "News Deleted" });
};

// Clent site News views
export const viewNewsForClient = async (req, res) => {
  try {
    const rows = await News.getAllNewsForClient();

    const makeImage = (img) => (img ? `${BASE_URL}/uploads/news/${img}` : "");

    const formattedData = rows.map((row) => ({
      id: row.id,
      category_id: row.category_id,
      category_name: row.category_name,
      category_slug: row.category_slug,
      author_id: row.authors_id,
      author_name: row.author_name,
      author_slug: row.author_slug,
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
      date: formatDate(row.created_date),
    }));

    res.json({
      success: true,
      base_url: BASE_URL,
      data: formattedData,
    });
  } catch (err) {
    // console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to load News",
    });
  }
};
