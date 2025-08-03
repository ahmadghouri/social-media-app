import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log("req.file", req.file);
    console.log("req.body", req.body);
    let resourceType = "image";
    if (file.mimetype.startsWith("video/")) {
      resourceType = "video";
    }

    return {
      folder: "socialmedia_uploads", // 📁 You can name it anything
      resource_type: resourceType, // 🔁 Auto detect image or video
      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "mp4",
        "mov",
        "avi",
        "mkv",
      ],
    };
  },
});

const upload = multer({ storage });
export default upload;
