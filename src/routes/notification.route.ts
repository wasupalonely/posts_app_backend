import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";
import { createNotificationSchema } from "../schemas/notification.schema";
import NotificationSerivce from "../services/notification.service";

const notificationService = new NotificationSerivce();
const notificationRoute = express.Router();

notificationRoute.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createNotificationSchema, "body"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = notificationService.createNotification(req.body);
      res.status(201).json(notification);
    } catch (err: any) {
      next(err);
    }
  },
);
