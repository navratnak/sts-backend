// backend\src\controllers\CareersEnquery.controller.js

import * as CareersEnquery from "../models/CareersEnquery.model.js";
import { updateStatus } from "../models/updateStatus.model.js";
import {
  adminJobEmailTemplate,
  userJobEmailTemplate,
} from "../utils/emailTemplate.js";
import { sendMail } from "../utils/sendMail.js";

const BASE_URL = process.env.BASE_URL;
const IMAGE_DIR = "uploads/careers";

export const list = async (req, res) => {
  const data = await CareersEnquery.getAllCareersEnquery();
  res.json({ success: true, data });
};

export const create = async (req, res) => {
  try {
    const document = req.file ? req.file.filename : null;
    const { name, number, email, subject } = req.body;

    if (!name || !number || !email) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // Save in DB
    const id = await CareersEnquery.createCareersEnquery({
      ...req.body,
      document,
      ip_address: req.ip,
    });

    // Prepare templates
    const adminHtml = adminJobEmailTemplate(req.body);
    const userHtml = userJobEmailTemplate(req.body);

    // Send email to Admin
    await sendMail(
      "Career Portal",
      process.env.ADMIN_EMAIL,
      `New Job Application - ${subject}`,
      adminHtml,
    );

    // Send confirmation to User
    await sendMail(
      "HR Team",
      email,
      "Application Received Successfully",
      userHtml,
    );

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await updateStatus("tbl_job_enquiry", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const remove = async (req, res) => {
  const careersenquery = await CareersEnquery.getCareersEnqueryById(
    req.params.id,
  );

  if (!careersenquery) return res.status(404).json({ message: "Not found" });

  // 🔥 DELETE IMAGE FILE
  if (careersenquery.document) {
    const imgPath = path.join(IMAGE_DIR, careersenquery.document);
    fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
  }

  await CareersEnquery.deleteCareersEnquery(req.params.id);
  res.json({ success: true, message: "Careers Enquery Deleted!" });
};
