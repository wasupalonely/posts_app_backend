import Boom from "boom";
import { NextFunction, Response, Request } from "express";

export function logErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);
  next(err);
}

export function errorHanlder(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

export function boomErrorHanlder(
  err: any | Boom,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.isBoom) {
    const { output } = err as Boom;
    res.status(output.statusCode).json(output.payload);
    return;
  } else {
    next(err);
  }
}
