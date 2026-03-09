// backend\src\controllers\ContactEnquery.controller.js

import * as ContactEnquery from "../models/ContactEnquery.model.js";
import { updateStatus } from "../models/updateStatus.model.js";
import { adminTemplate, userTemplate } from "../utils/emailTemplate.js";
import { sendMail } from "../utils/sendMail.js";

export const list = async (req, res) => {
  const data = await ContactEnquery.getAllContactEnquery();
  res.json({ success: true, data });
};

export const create = async (req, res) => {
  try {
    const { name, number, email } = req.body;

    if (!name || !number || !email) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // Save in DB
    const id = await ContactEnquery.createContactEnquery({
      ...req.body,
      ip_address: req.ip,
    });

    // Prepare templates
    const adminHtml = adminTemplate(req.body);
    const userHtml = userTemplate(req.body);

    // Send email to Admin
    await sendMail(
      "Website Enquiry",
      process.env.ADMIN_EMAIL,
      "New Contact Enquiry Received",
      adminHtml,
    );

    // Send confirmation to User
    await sendMail(
      "Website Enquiry",
      email,
      "Thank You for Contacting Us",
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
  await updateStatus("tbl_contact_enquiry", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const remove = async (req, res) => {
  await ContactEnquery.deleteContactEnquery(req.params.id);
  res.json({ success: true, message: "ContactEnquery Deleted!" });
};
