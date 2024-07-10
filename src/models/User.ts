import mongoose, { Schema } from "mongoose";
import { IUser } from "../types";
import bcrypt from "bcrypt";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  followers: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
  following: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
  bookmarks: { type: [Schema.Types.ObjectId], ref: 'Post', default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

export const User = mongoose.model<IUser>("User", UserSchema);
