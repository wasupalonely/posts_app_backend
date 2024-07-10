import { Router, Request, Response } from "express";
import MessageService from "../services/message.service";
import { authenticateSocket } from "../middlewares/authSocket";
import passport from "passport";

const messageSerivce = new MessageService()
const messageRouter = Router();

messageRouter.post(
  "/message",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
  const { sender, receiver, message } = req.body;
  try {
    const savedMessage = await messageSerivce.saveMessage(sender, receiver, message);
    res.status(201).json(savedMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

messageRouter.get(
  "/messages",
  passport.authenticate("jwt", { session: false }), 
  async (req: Request, res: Response) => {
  const { user1, user2 } = req.query;
  try {
    const messages = await messageSerivce.getMessages(user1 as string, user2 as string);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to get messages" });
  }
});

export default messageRouter;
