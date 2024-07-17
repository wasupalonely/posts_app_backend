import { Router, Request, Response, NextFunction } from "express";
import MessageService from "../services/message.service";
import { authenticateSocket } from "../middlewares/authSocket";
import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";
import { deleteMessageByConversation } from "../schemas/message.schema";

const messageSerivce = new MessageService()
const messageRouter = Router();

messageRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
  const { sender, receiver, message } = req.body;
  try {
    const savedMessage = await messageSerivce.saveMessage(sender, receiver, message);
    res.status(201).json(savedMessage);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

messageRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
  const { user1, user2 } = req.query;
  try {
    const messages = await messageSerivce.getMessages(user1 as string, user2 as string);
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

messageRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedMessage = await messageSerivce.deleteMessage(id);
    res.status(200).json(deletedMessage);
  } catch (error) {
    next(error);
  }
}
)

messageRouter.delete(
  "/delete-conversation",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deleteMessageByConversation, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
  const { sender, receiver } = req.body;
  try {
    const deletedMessage = await messageSerivce.deleteConversation(sender, receiver);
    res.status(200).json(deletedMessage);
  } catch (error) {
    next(error);
  }}
)

export default messageRouter;
