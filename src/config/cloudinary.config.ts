import { v2 as cloudinary } from "cloudinary";
import env from "./config";
import Boom from "@hapi/boom";
import fs from 'fs';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath: string): Promise<string> => {
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }
  
    try {
      const result = await cloudinary.uploader.upload(filePath);
      return result.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw Boom.badRequest("Error uploading image to Cloudinary");
    }
  };
