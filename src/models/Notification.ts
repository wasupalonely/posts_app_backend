import mongoose, { Schema } from "mongoose";
import { INotification } from "../types";

const NotificationSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  seen: { type: Boolean, default: false },
  to: { type: String, required: true },
  from: { type: String, required: true },
  type: { type: String, required: true },
  actionUrl: { type: String },
  metadata: { type: Map, of: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
