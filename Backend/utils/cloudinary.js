require('dotenv').config();
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (filePath, folder = "hero-sections") => {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const compressedPath = filePath + "-compressed.jpg";

    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      await sharp(filePath)
        .resize({ width: 1280 })
        .jpeg({ quality: 70 })
        .toFile(compressedPath);

      fs.unlinkSync(filePath);
    }

    const finalUploadPath = fs.existsSync(compressedPath) ? compressedPath : filePath;

    const result = await cloudinary.uploader.upload(finalUploadPath, { folder });

    fs.unlinkSync(finalUploadPath);

    return result.secure_url;
  } catch (err) {
    console.error("❌ Cloudinary Upload Error:", err);
    throw err;
  }
};

module.exports = { uploadToCloudinary };
