// backend\src\controllers\Client.controller.js
import fs from "fs";
import path from "path";
import * as Client from "../models/Client.model.js";
import { slugify } from "../utils/slugify.js";
import { updateStatus } from "../models/updateStatus.model.js";

const BASE_URL = process.env.BASE_URL;
const IMAGE_DIR = "uploads/client";

export const list = async (req, res) => {
  const data = await Client.getAllClient();
  res.json({ success: true, data });
};

export const create = async (req, res) => {
  const image = req.file ? req.file.filename : null;
  const permalink = slugify(req.body.name);

  const id = await Client.createClient({
    ...req.body,
    permalink,
    image,
    created_by: req.user.id,
    ip_address: req.ip,
  });

  res.status(201).json({
    success: true,
    message: "Client Created!",
    id,
  });
};

export const update = async (req, res) => {
  const client = await Client.getClientById(req.params.id);
  if (!client) return res.status(404).json({ message: "Not found" });

  let image = client.image;

  // NEW IMAGE UPLOADED
  if (req.file) {
    // 🔥 DELETE OLD IMAGE
    if (client.image) {
      const oldPath = path.join(IMAGE_DIR, client.image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    image = req.file.filename;
  }

  const permalink = slugify(req.body.name);

  await Client.updateClient(req.params.id, {
    ...req.body,
    image,
    permalink,
    ip_address: req.ip,
  });

  res.json({ success: true, message: "Client Updated!" });
};

export const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await updateStatus("tbl_client", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const remove = async (req, res) => {
  const client = await Client.getClientById(req.params.id);
  if (!client) return res.status(404).json({ message: "Not found" });

  // 🔥 DELETE IMAGE FILE
  if (client.image) {
    const imgPath = path.join(IMAGE_DIR, client.image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }

  await Client.deleteClient(req.params.id);
  res.json({ success: true, message: "Client Deleted!" });
};

// Clent site Service Caegory views
export const viewClientForClient = async (req, res) => {
  try {
    const rows = await Client.getAllClientForClient();

    const makeImage = (img) => (img ? `${BASE_URL}/uploads/client/${img}` : "");

    const formattedData = rows.map((row) => ({
      id: row.id,
      name: row.name,
      url: row.url,
      image: makeImage(row.image),
      image_title: row.image_title,
      image_alt: row.image_alt,
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
      message: "Failed to load Client",
    });
  }
};
