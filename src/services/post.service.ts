import Boom from "@hapi/boom";
import { Post } from "../models/Post";
import UserService from "./user.service";
import { IPost } from "../types";
import { uploadToCloudinary } from "../config/cloudinary.config";

class PostService {
  private userService = new UserService();
  async getPosts() {
    const posts = await Post.find().sort({ createdAt: -1 });
    return posts;
  }

  async getPostById(id: string) {
    try {
      const post = await Post.findById(id);
      return post;
    } catch (error: any) {
      throw Boom.notFound("Post not found");
    }
  }

  async createPost(post: IPost): Promise<IPost> {
    const { authorId } = post;

    const author = await this.userService.getUserById(authorId);

    if (!author) {
      throw Boom.badRequest("Author not found");
    }

    try {
      const newPost = await Post.create(post);
      return newPost;
    } catch (error) {
      throw Boom.badRequest("Error creating post");
    }
  }

  async updatePost(id: string, post: IPost) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
      return updatedPost;
    } catch (error) {
      throw Boom.badRequest("Error updating post");
    }
  }

  async deletePost(id: string) {
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      return deletedPost;
    } catch (error) {
      throw Boom.badRequest("Error deleting post");
    }
  }

  async likePost(id: string, userId: string) {
    try {
      const post = await this.getPostById(id);
      if (post) {
        if (post.likes.includes(userId)) {
          console.log("Ya le había dado like --->", userId);
          post.likes = post.likes.filter((like) => like.toString() !== userId);
          console.log("post.likes", post.likes);
        } else {
          post.likes.push(userId);
        }
        const updatedPost = await Post.findByIdAndUpdate(id, post, {
          new: true,
        });
        return updatedPost;
      }
    } catch (error) {
      throw Boom.badRequest("Error liking post");
    }
  }

  async getBookmarkedPosts(userId: string) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw Boom.notFound("User not found");
      }
      const posts = await Post.find({ _id: { $in: user.bookmarks } });
      return posts;
    } catch (error) {
      throw Boom.badRequest("Error getting bookmarked posts");
    }
  }
}

export default PostService;
