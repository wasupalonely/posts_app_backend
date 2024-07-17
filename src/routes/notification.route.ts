import express, { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";
import { createNotificationSchema } from "../schemas/notification.schema";
import NotificationSerivce from "../services/notification.service";

const notificationService = new NotificationSerivce();
const notificationRoute = Router();

notificationRoute.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createNotificationSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await notificationService.createNotification(
        req.body,
      );
      res.status(201).json(notification);
    } catch (err: any) {
      next(err);
    }
  },
);

notificationRoute.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await notificationService.getNotifications();
      res.status(200).json(notifications);
    } catch (err: any) {
      next(err);
    }
  },
);

notificationRoute.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await notificationService.getNotificationById(
        req.params.id,
      );
      res.status(200).json(notification);
    } catch (err: any) {
      next(err);
    }
  },
);

notificationRoute.get(
  "/receiver/:receiverId",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page: number = parseInt(req.query.page as string, 10) || 1;
      const limit: number = parseInt(req.query.limit as string, 10) || 10;
      const notifications =
        await notificationService.getNotificationsByReceiver(
          req.params.receiverId,
          page,
          limit,
        );
      res.status(200).json(notifications);
    } catch (err: any) {
      next(err);
    }
  },
);

export default notificationRoute;
