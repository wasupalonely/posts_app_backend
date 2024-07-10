import Boom from "@hapi/boom";
import { Comment } from "../models/Comment";

class CommentService {
  async getComments() {
    try {
      const comments = await Comment.find();
      return comments;
    } catch (error) {
      throw Boom.badRequest("Error getting comments");
    }
  }

  async getCommentById(id: string) {
    try {
      const comment = await Comment.findById(id);
      return comment;
    } catch (error) {
      throw Boom.notFound("Comment not found");
    }
  }

  async getCommentsByPostId(postId: string) {
    try {
      const comments = await Comment.find({ postId });
      return comments;
    } catch (error) {
      throw Boom.badRequest("Error getting comments");
    }
  }

  async likeComment(id: string, userId: string) {
    try {
      const comment = await this.getCommentById(id);
      if (comment) {
        if (comment.likes.includes(userId)) {
          comment.likes = comment.likes.filter((like) => like !== userId);
        } else {
          comment.likes.push(userId);
        }
        const updatedComment = await Comment.findByIdAndUpdate(id, comment, {
          new: true,
        });
        return updatedComment;
      }
    } catch (error) {
      throw Boom.badRequest("Error liking comment");
    }
  }

  async updateComment(id: string, comment: typeof Comment) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(id, comment, {
        new: true,
      });
      return updatedComment;
    } catch (error) {
      throw Boom.badRequest("Error updating comment");
    }
  }

  async createComment(comment: typeof Comment) {
    try {
      const newComment = await Comment.create(comment);
      return newComment;
    } catch (error) {
      throw Boom.badRequest("Error creating comment");
    }
  }

  async deleteComment(id: string) {
    try {
      const deletedComment = await Comment.findByIdAndDelete(id);
      return deletedComment;
    } catch (error) {
      throw Boom.badRequest("Error deleting comment");
    }
  }
}

export default CommentService;
