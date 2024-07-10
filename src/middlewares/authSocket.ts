import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import env from "../config/config";
import Boom from "@hapi/boom";

interface User {
  id: string;
  username: string;
}

export const authenticateSocket = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, env.JWT_SECRET) as User;
    console.log("🚀 ~ authenticateSocket ~ user:", user)
    socket.data.user = user;
    next();
  } catch (error) {
    next(Boom.badRequest("Authentication error"));
  }
};
