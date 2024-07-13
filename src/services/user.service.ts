import Boom from "@hapi/boom";
import { User } from '../models/User';
import { IUser } from "../types";
import { Post } from "../models/Post";
import { uploadImage } from "../utils/utils";

class UserService {
  async createUser(user: IUser): Promise<IUser> {
    try {
      const newUser = await User.create(user);
      return newUser.toObject() as IUser;
    } catch (error) {
      throw Boom.badRequest('Error creating user');
    }
  }

  async updateUserPhoto(id: string, path: string) {
    try {

      const userFound = await User.findById(id);

      if (!userFound) {
        throw Boom.notFound('User not found');
      }

      const imageUrl = await uploadImage(path);
      const user = await User.findByIdAndUpdate(id, { profilePicture: imageUrl }, { new: true });
      return user;
    } catch (error) {
      throw Boom.badRequest('Error updating user');
    }
  }

  async toggleFollow(id: string, userId: string) {
    try {
      const userToFollow = await User.findById(id);
      const currentUser = await User.findById(userId);

      if (!userToFollow || !currentUser) {
        throw Boom.notFound('User not found');
      }

      if (userToFollow.followers?.includes(userId)) {
        userToFollow.followers = userToFollow.followers?.filter(follower => follower.toString() !== userId);
        currentUser.following = currentUser.following?.filter(following => following.toString() !== id);
        await userToFollow.save();
        await currentUser.save();
        return true;
      } else {
        userToFollow.followers?.push(userId);
        currentUser.following?.push(id);
        await userToFollow.save();
        await currentUser.save();
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  async bookmarkPost(id: string, postId: string) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw Boom.notFound('User not found');
      }

      const post = await Post.findById(postId);
      if (!post) {
        throw Boom.notFound('Post not found');
      }

      if (user.bookmarks?.includes(postId)) {
        user.bookmarks = user.bookmarks?.filter(bookmark => bookmark.toString() !== postId);
        post.bookmarks = post.bookmarks?.filter(bookmark => bookmark.toString() !== id);
        await post.save();
        await user.save();
        return user;
      }

      post.bookmarks?.push(id);
      user.bookmarks?.push(postId);
      await post.save();
      await user.save();
      return user;
    } catch (error) {
      throw Boom.badRequest('Error bookmarking post');
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw Boom.internal("Error getting users");
    }
  }

  async getUserById(id: string) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw Boom.notFound("User not found");
    }
  }

  async getUserByIdentifier(identifier: string) {
    try {
      const userEmail = await User.findOne({ email: identifier });
      if (userEmail) {
        return userEmail;
      }
      const userUsername = await User.findOne({ username: identifier });
      if (userUsername) {
        return userUsername;
      }
    } catch (error) {
      throw Boom.notFound("User not found");
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = await User.findOne({ username });
      return user;
    } catch (error) {
      throw Boom.notFound("User not found");
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw Boom.notFound("User not found");
    }
  }

  async updateUser(id: string, user: Partial<typeof User>) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
      return updatedUser;
    } catch (error) {
      throw Boom.badRequest("Error updating user");
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
      throw Boom.badRequest("Error deleting user");
    }
  }
}

export default UserService;
