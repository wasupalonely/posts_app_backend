import Joi from "joi";

const id = Joi.string().uuid();
const postId = Joi.string();
const authorId = Joi.string();
const content = Joi.string();
const likes = Joi.array().items(Joi.string());
const createdAt = Joi.date();
const updatedAt = Joi.date();

export const createCommentSchema = Joi.object({
    postId: postId.required(),
    authorId: authorId.required(),
    content: content.required(),
    likes: likes,
    createdAt: createdAt,
    updatedAt: updatedAt
})

export const updateCommentSchema = Joi.object({
    postId: postId,
    authorId: authorId,
    content: content,
    likes: likes,
    createdAt: createdAt,
    updatedAt: updatedAt
})


export const deleteCommentSchema = Joi.object({
    id: id.required()
})


export const getCommentSchema = Joi.object({
    id: id.required()
})

export const getCommentByPostIdSchema = Joi.object({
    postId: postId.required()
})

export const likeCommentSchema = Joi.object({
    authorId: authorId.required()
})