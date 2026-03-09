// backend\src\controllers\Counter.controller.js

import * as Counter from "../models/Counter.model.js";
import { slugify } from "../utils/slugify.js";
import { updateStatus } from "../models/updateStatus.model.js";

export const list = async (req, res) => {
  const data = await Counter.getAllCounter();
  res.json({ success: true, data });
};

export const create = async (req, res) => {
  try {
    if (!req.body?.name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const permalink = slugify(req.body.name);

    const id = await Counter.createCounter({
      ...req.body,
      permalink,
      created_by: req.user.id,
      ip_address: req.ip,
    });

    res.status(201).json({
      success: true,
      message: "Counter created",
      id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create counter",
    });
  }
};
export const update = async (req, res) => {
  const permalink = slugify(req.body.name);

  await Counter.updateCounter(req.params.id, {
    ...req.body,
    permalink,
    ip_address: req.ip,
  });

  res.json({ success: true, message: "Counter updated" });
};

export const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await updateStatus("tbl_counter", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const remove = async (req, res) => {
  await Counter.deleteCounter(req.params.id);
  res.json({ success: true, message: "Counter deleted" });
};

// Clent site Service Caegory views
export const viewCounterForClient = async (req, res) => {
  try {
    const rows = await Counter.getAllCounterForClient();

    const formattedData = rows.map((row) => ({
      id: row.id,
      name: row.name,
      count: row.count,
      suffix: row.suffix,
      slug: row.permalink,
    }));

    res.json({
      success: true,
      data: formattedData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to load Counter",
    });
  }
};
