import { IMessage } from "../types";
import { Message } from "../models/Message";
import Boom from "@hapi/boom";

class MessageService {
  public async saveMessage(
    sender: string,
    receiver: string,
    message: string,
  ): Promise<IMessage> {
    try {
      const msg = new Message({
        sender,
        receiver,
        message,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return await msg.save();
    } catch (error) {
      console.error("Error saving message:", error);
      throw Boom.badRequest("Error saving message");
    }
  }

  public async getMessages(user1: string, user2: string): Promise<IMessage[]> {
    return await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ createdAt: 1 });
  }
}

export default MessageService;
