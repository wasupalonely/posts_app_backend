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

  if (!token) {
    return next(Boom.badRequest("Authentication error"));
  }

  try {
    const user = jwt.verify(token, env.JWT_SECRET) as User;
    console.log("🚀 ~ authenticateSocket ~ user:", user);
    console.log("Token:", token);
    socket.data.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    next(Boom.badRequest("Authentication error"));
  }
};
