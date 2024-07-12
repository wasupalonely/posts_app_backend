import Joi from "joi";

const id = Joi.string();
const username = Joi.string();
const email = Joi.string();
const password = Joi.string().min(6).max(20);
const profilePicture = Joi.string();
const bio = Joi.string();
const role = Joi.string().valid("user", "admin");
const createdAt = Joi.date();
const updatedAt = Joi.date();
const userId = Joi.string();

export const createUserSchema = Joi.object({
    username: username.required(),
    email: email.required(),
    password: password.required(),
    profilePicture: profilePicture,
    bio: bio,
    role: role,
    createdAt: createdAt,
    updatedAt: updatedAt
});

export const registerUserSchema = Joi.object({
    username: username.required(),
    email: email.required(),
    password: password.required(),
    createdAt: createdAt,
    updatedAt: updatedAt
})

export const updateUserSchema = Joi.object({
    username: username,
    email: email,
    password: password,
    profilePicture: profilePicture,
    bio: bio,
    createdAt: createdAt,
    updatedAt: updatedAt
});

export const toggleFollowSchema = Joi.object({
    userId: userId.required()
})

export const getUserSchema = Joi.object({
    id: id.required()
});

export const deleteUserSchema = Joi.object({
    id: id.required()
});
