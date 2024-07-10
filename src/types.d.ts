import { Document } from 'mongoose';

export interface IUser {
  role: string;
  followers?: string[];
  following?: string[];
  bookmarks?: string[];
  _id?: string;
  username: string;
  password: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}


export interface IPost {
  authorId: string;
  content: string;
  media?: string[];
  likes: string[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  postId: string;
  authorId: string;
  content: string;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IMessage extends Document {
  sender: string;
  receiver: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
