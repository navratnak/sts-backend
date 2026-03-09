// backend\src\controllers\Jobs.controller.js
import * as Jobs from "../models/Jobs.model.js";
import { slugify } from "../utils/slugify.js";
import { updateStatus } from "../models/updateStatus.model.js";

export const list = async (req, res) => {
  const data = await Jobs.getAllJobs();
  res.json({ success: true, data });
};

export const create = async (req, res) => {
  const permalink = slugify(req.body.name);

  const id = await Jobs.createJobs({
    ...req.body,
    permalink,
    created_by: req.user.id,
    ip_address: req.ip,
  });

  res.status(201).json({
    success: true,
    message: "Jobs Created!",
    id,
  });
};

export const update = async (req, res) => {
  const permalink = slugify(req.body.name);

  await Jobs.updateJobs(req.params.id, {
    ...req.body,
    permalink,
    ip_address: req.ip,
  });

  res.json({ success: true, message: "Jobs Updated!" });
};

export const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await updateStatus("tbl_jobs", id, status);
  res.json({ success: true, message: "Status updated" });
};

export const remove = async (req, res) => {
  await Jobs.deleteJobs(req.params.id);
  res.json({ success: true, message: "Jobs Deleted!" });
};

// Clent site Service Caegory views
export const viewJobsForClient = async (req, res) => {
  try {
    const rows = await Jobs.getAllJobsForClient();

    const formattedData = rows.map((row) => ({
      id: row.id,
      name: row.name,
      experience: row.experience,
      no_of_post: row.no_of_post,
      salary: row.salary,
      Industry_type: row.Industry_type,
      employment_type: row.employment_type,
      department: row.department,
      education: row.education,
      post_role: row.post_role,
      key_skills: row.key_skills,
      description: row.description,
      date: row.create_date,
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
      message: "Failed to load Jobs",
    });
  }
};
