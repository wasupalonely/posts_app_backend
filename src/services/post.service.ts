import Boom from "@hapi/boom";
import { Post } from "../models/Post";
import UserService from './user.service';
import { IPost } from "../types";
import { uploadToCloudinary } from "../config/cloudinary.config";

class PostService {
  
  private userService = new UserService();
  async getPosts() {
    const posts = await Post.find();
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
          post.likes = post.likes.filter((like) => like !== userId);
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

  async uploadImage(filePath: string): Promise<string> {
    try {
      const imageUrl = await uploadToCloudinary(filePath);
      return imageUrl;
    } catch (error) {
      console.error("Upload Image Error:", error);
      throw Boom.badRequest("Error uploading image");
    }
  }
}

export default PostService;
