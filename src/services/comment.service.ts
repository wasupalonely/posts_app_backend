import Boom from "@hapi/boom";
import { Comment } from "../models/Comment";
import PostService from "./post.service";
import { IComment } from "../types";
import UserService from "./user.service";

class CommentService {
  private postsService = new PostService();
  private usersService = new UserService();
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

  async createComment(comment: IComment) {
    try {
      const newComment = await Comment.create(comment);
      const user = await this.usersService.getUserById(comment.authorId);
      if (!user) {
        throw Boom.notFound("User not found");
      }
      newComment.authorUsername = user.username;
      newComment.save();
      const post = await this.postsService.getPostById(comment.postId);
      if (!post) {
        throw Boom.notFound("Post not found");
      }
      post.comments.push(newComment);
      await post.save();
      return newComment;
    } catch (error: any) {
      throw Boom.badRequest("Error creating comment", error.message);
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
