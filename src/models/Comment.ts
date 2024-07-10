import mongoose, { Schema } from "mongoose";
import { IComment } from "../types";

const CommentSchema: Schema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
