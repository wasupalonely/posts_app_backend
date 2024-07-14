import Joi from "joi";

const identifier = Joi.string();
const password = Joi.string();
const username = Joi.string();
const email = Joi.string();
const token = Joi.string();
const newPassowrd = Joi.string();

export const loginSchema = Joi.object({
    identifier: identifier.required(),
    password: password.required()
});

export const registerSchema = Joi.object({
    username: username.required(),
    email: email.required(),
    password: password.required()
});

export const recoverySchema = Joi.object({
    email: email.required()
})

export const changePasswordSchema = Joi.object({
    newPassowrd: newPassowrd.required(),
    token: token.required()
})