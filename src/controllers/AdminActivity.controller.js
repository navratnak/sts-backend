import * as Activity from "../models/AdminActivity.model.js";

export const listLogs = async (req, res) => {
  const logs = await Activity.getLogs();
  res.json(logs);
};
