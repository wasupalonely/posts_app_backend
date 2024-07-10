import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types";

const CategorySchema: Schema = new Schema ({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
