// backend/src/utils/imageUrl.js
export const imageUrl = (folder, filename) => {
  if (!filename) return null;
  return `${process.env.BASE_URL}/uploads/${folder}/${filename}`;
};
