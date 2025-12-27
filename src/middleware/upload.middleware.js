// backend/src/middleware/upload.middleware.js

import multer from "multer";
import path from "path";
import fs from "fs";

const createStorage = (folderName) => {
  const uploadPath = `uploads/${folderName}`;

  // folder auto create
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + path.extname(file.originalname));
    },
  });
};

// 👇 factory function
export const upload = (folderName) =>
  multer({
    storage: createStorage(folderName),
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
      const allowed = /jpeg|jpg|png|webp/;
      const ext = allowed.test(path.extname(file.originalname).toLowerCase());
      const mime = allowed.test(file.mimetype);

      if (ext && mime) cb(null, true);
      else cb(new Error("Only images allowed"));
    },
  });
