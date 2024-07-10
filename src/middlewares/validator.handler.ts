import Boom from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default function validatorHandler(
  schema: Joi.ObjectSchema,
  property: "body" | "query" | "params",
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(Boom.badRequest(error));
    } else {
      next();
    }
  };
}
