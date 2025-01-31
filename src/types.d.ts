import { Document } from 'mongoose';

export interface IUser {
  role: string;
  followers?: string[];
  following?: string[];
  bookmarks?: string[];
  _id?: string;
  username: string;
  recoveryToken?: string | null;
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
  bookmarks: string[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  postId: string;
  authorId: string;
  authorUsername?: string;
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

export interface IMessage extends Document {
  sender: string;
  receiver: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotification extends Document {
  title: string;
  content: string;
  seen: boolean;
  to: string;
  from: string;
  type: string;
  actionUrl?: string;
  metadata?: Map<string, string>;
  createdAt: Date;
  updatedAt: Date;
}
