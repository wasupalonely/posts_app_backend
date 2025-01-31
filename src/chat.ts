import { Server } from "socket.io";
import http from "http";
import { authenticateSocket } from "./middlewares/authSocket";
import MessageService from "./services/message.service";
import UserService from "./services/user.service";

export const initChat = (server: http.Server) => {
  const messageService = new MessageService();
  const userService = new UserService();
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.data.user.username}`);

    socket.on("startChat", async (receiverId) => {
      const room = [socket.data.user.id, receiverId].sort().join('-');
      socket.join(room);
      const messages = await messageService.getMessages(socket.data.user.id, receiverId);

      const messagesWithUsernames = await Promise.all(messages.map(async (msg) => {
        const sender = await userService.getUserById(msg.sender);
        return {
          ...msg.toObject(),
          sender: sender?.username
        };
      }));

      socket.emit("loadMessages", messagesWithUsernames);
    });

    socket.on("privateMessage", async (receiverId, message) => {
      const msg = await messageService.saveMessage(socket.data.user.id, receiverId, message);
      const room = [socket.data.user.id, receiverId].sort().join('-');
      io.to(room).emit("privateMessage", { sender: socket.data.user.id, message, createdAt: msg.createdAt });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.data.user.username}`);
    });
  });
};
