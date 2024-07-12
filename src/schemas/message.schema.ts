import Joi from "joi";

const id = Joi.string().uuid()
const sender = Joi.string().uuid()
const receiver = Joi.string().uuid()
const message = Joi.string()
const createdAt = Joi.date()
const updatedAt = Joi.date()


export const deleteMessageByConversation = Joi.object({
  sender: sender.required(),
  receiver: receiver.required()
})
