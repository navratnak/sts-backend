// backend\src\controllers\WorkingProcess.controller.js
import fs from "fs";
import path from "path";
import * as WorkingProcess from "../models/WorkingProcess.model.js";
import { slugify } from "../utils/slugify.js";
import { updateStatus } from "../models/updateStatus.model.js";

const BASE_URL = process.env.BASE_URL;
const IMAGE_DIR = "uploads/workingprocess";

export const list = async (req, res) => {
  const data = await WorkingProcess.getAllWorkingProcess();
  res.json({ success: true, data });
};

export const activeWorkingProcess = async (req, res) => {
  const data = await WorkingProcess.getAllWorkingProcessForNewsView();
  res.json({ success: true, data });
};

export const create = async (req, res) => {
  const image = req.file ? req.file.filename : null;
  const permalink = slugify(req.body.name);

  const id = await WorkingProcess.createWorkingProcess({
    ...req.body,
    permalink,
    image,
    created_by: req.user.id,
    ip_address: req.ip,
  });

  res.status(201).json({
    success: true,
    message: "WorkingProcess Created!",
    id,
  });
};

export const update = async (req, res) => {
  const workingprocess = await WorkingProcess.getWorkingProcessById(
    req.params.id,
  );
  if (!workingprocess) return res.status(404).json({ message: "Not found" });

  let image = workingprocess.image;

  // NEW IMAGE UPLOADED
  if (req.file) {
    // 🔥 DELETE OLD IMAGE
    if (workingprocess.image) {
      const oldPath = path.join(IMAGE_DIR, workingprocess.image);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }
    image = req.file.filename;
  }

  const permalink = slugify(req.body.name);

  await WorkingProcess.updateWorkingProcess(req.params.id, {
    ...req.body,
    image,
    permalink,
    ip_address: req.ip,
  });

  res.json({ success: true, message: "WorkingProcess Updated!" });
};

export const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await updateStatus("tbl_workingprocess", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const remove = async (req, res) => {
  const workingprocess = await WorkingProcess.getWorkingProcessById(
    req.params.id,
  );
  if (!workingprocess) return res.status(404).json({ message: "Not found" });

  // 🔥 DELETE IMAGE FILE
  if (workingprocess.image) {
    const imgPath = path.join(IMAGE_DIR, workingprocess.image);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }

  await WorkingProcess.deleteWorkingProcess(req.params.id);
  res.json({ success: true, message: "WorkingProcess Deleted!" });
};

// Clent site Service Caegory views
export const viewWorkingProcessForClient = async (req, res) => {
  try {
    const rows = await WorkingProcess.getAllWorkingProcessForClient();

    const makeImage = (img) =>
      img ? `${BASE_URL}/uploads/workingprocess/${img}` : "";

    const formattedData = rows.map((row) => ({
      id: row.id,
      name: row.name,
      tagline: row.tagline,
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
      message: "Failed to load WorkingProcess",
    });
  }
};
