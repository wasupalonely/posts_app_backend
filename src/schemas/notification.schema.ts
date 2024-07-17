import Joi from "joi";

const id = Joi.string();
const title = Joi.string();
const content = Joi.string();
const seen = Joi.boolean();
const to = Joi.string();
const from = Joi.string();
const type = Joi.string();
const actionUrl = Joi.string();
const metadata = Joi.object();
const createdAt = Joi.date();
const updatedAt = Joi.date();

export const createNotificationSchema = Joi.object({
  title: title.required(),
  content: content.required(),
  seen: seen,
  to: to.required(),
  from: from.required(),
  type: type.required(),
  actionUrl: actionUrl,
  metadata: metadata,
  createdAt: createdAt,
  updatedAt: updatedAt
})
