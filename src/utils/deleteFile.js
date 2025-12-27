const fs = require("fs");
const path = require("path");

module.exports = (relativePath) => {
  if (!relativePath) return;

  const filePath = path.join(__dirname, "..", relativePath);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("File delete failed:", err.message);
    }
  });
};
