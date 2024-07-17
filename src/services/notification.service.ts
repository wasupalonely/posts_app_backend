import Boom from "@hapi/boom";
import { Notification } from "../models/Notification";
import { INotification } from "../types";
import UserService from "./user.service";
import AuthService from "./auth.service";
import env from "../config/config";

class NotificationSerivce {
  private userService = new UserService();
  private authService = new AuthService();

  async createNotification(notification: INotification) {
    try {
      const sender = await this.userService.getUserById(
        notification.from,
      );
      console.log("🚀 ~ createNotification ~ sender:", sender);
      const receiver = await this.userService.getUserById(
        notification.to,
      );
      console.log("🚀 ~ createNotification ~ receiver:", receiver);
      let mailStatus;
      if (!sender || !receiver) {
        throw Boom.badRequest("Sender or receiver not found");
      }
      const newNotification = await Notification.create(notification);

      try {
        this.authService.sendMail({
          from: env.EMAIL_MAILER,
          to: receiver.email.trim(),
          subject: notification.title,
          html: notification.content,
        });

        mailStatus = true;
      } catch (error: any) {
        console.log(error);
        throw Boom.badRequest("Error sending email", error.message);
      }

      return { newNotification, mailSent: mailStatus };
    } catch (error: any) {
      console.log("Error creating notification:", error.message);
      throw Boom.badRequest("Error creating notification");
    }
  }

  async getNotifications() {
    try {
      const notifications = await Notification.find();
      return notifications;
    } catch (error: any) {
      console.log("Error getting notifications:", error.message);
      throw Boom.badRequest("Error getting notifications");
    }
  }

  async getNotificationById(id: string) {
    try {
      const notification = await Notification.findById(id);
      return notification;
    } catch (error: any) {
      console.log("Error getting notification:", error.message);
      throw Boom.badRequest("Error getting notification");
    }
  }

  async getNotificationsByReceiver(receiverId: string, page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      const notifications = await Notification.find({ to: receiverId })
        .skip(skip)
        .limit(limit);
      return notifications;
    } catch (error: any) {
      console.log("Error getting notifications:", error.message);
      throw Boom.badRequest("Error getting notifications");
    }
  }
}

export default NotificationSerivce;
