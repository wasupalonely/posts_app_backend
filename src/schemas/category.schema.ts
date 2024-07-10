import Joi from "joi";

const id = Joi.string().uuid();
const name = Joi.string().max(50);
const description = Joi.string().max(100);
const createdAt = Joi.date();
const updatedAt = Joi.date();

export const createCategorySchema = Joi.object({
    name: name.required(),
    description: description.required(),
    createdAt: createdAt,
    updatedAt: updatedAt
})

export const updateCategorySchema = Joi.object({
    name: name,
    description: description,
    createdAt: createdAt,
    updatedAt: updatedAt
})

export const getCategorySchema = Joi.object({
    id: id.required()
})

export const getCategoryByName = Joi.object({
    name: name.required()
})