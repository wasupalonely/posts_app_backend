import Joi from "joi";
import { IPost } from "../types";

const id = Joi.string().uuid()
const authorId = Joi.string()
const content = Joi.string()
const media = Joi.array().items(Joi.string())
const likes = Joi.array().items(Joi.string())
const comments = Joi.array().items(Joi.string())
const createdAt = Joi.date()
const updatedAt = Joi.date()

export const createPostSchema: Joi.ObjectSchema<IPost> = Joi.object({
    authorId: authorId.required(),
    content: content.required(),
    media: media,
    likes: likes,
    comments: comments,
    createdAt: createdAt,
    updatedAt: updatedAt
})

export const updatePostSchema = Joi.object({
    authorId: authorId,
    content: content,
    media: media,
    likes: likes,
    comments: comments,
    createdAt: createdAt,
    updatedAt: updatedAt
})

export const getPostsSchema = Joi.object({
    id: id.required()
})

export const likePostSchema = Joi.object({
    userId: id.required()
})
