import Boom from "@hapi/boom";
import { uploadToCloudinary } from "../config/cloudinary.config";

export const uploadImage = async (filePath: string): Promise<string> => {
  try {
    const imageUrl = await uploadToCloudinary(filePath);
    return imageUrl;
  } catch (error) {
    console.error("Upload Image Error:", error);
    throw Boom.badRequest("Error uploading image");
  }
}
