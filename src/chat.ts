import { Server } from "socket.io";
import http from "http";
import { authenticateSocket } from "./middlewares/authSocket";
import MessageService from "./services/message.service";

export const initChat = (server: http.Server) => {
  const messageService = new MessageService();
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.data.user.username}`);

    socket.on("startChat", async (receiverId) => {
      const room = [socket.data.user.id, receiverId].sort().join('-');
      socket.join(room);
      const messages = await messageService.getMessages(socket.data.user.id, receiverId);
      socket.emit("loadMessages", messages);
    });

    socket.on("privateMessage", async (receiverId, message) => {
      const msg = await messageService.saveMessage(socket.data.user.id, receiverId, message);
      const room = [socket.data.user.id, receiverId].sort().join('-');
      io.to(room).emit("privateMessage", { sender: socket.data.user.username, message, createdAt: msg.createdAt });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.data.user.username}`);
    });
  });
};
