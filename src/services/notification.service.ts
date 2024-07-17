import Boom from "@hapi/boom";
import { Notification } from "../models/Notification";
import { INotification } from "../types";
import UserService from "./user.service";

class NotificationSerivce {

  private userService = new UserService();

  async createNotification(notification: INotification) {
    try {
      const sender = await this.userService.getUserByUsername(notification.from);
      // const 
      const newNotification = await Notification.create(notification)
      return newNotification;
    } catch (error) {
      throw Boom.badRequest("Error creating notification")
    }
  }
}

export default NotificationSerivce
