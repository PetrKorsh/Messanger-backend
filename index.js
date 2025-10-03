const { createServer } = require("node:http");
const { connectDB } = require("./db");
const app = require("./server");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8080;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

connectDB();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    chatService.registerUser(userId, socket.id);
  });

  socket.on("sendMessage", async (data) => {
    await chatService.sendMessage(io, data);
  });

  socket.on("disconnect", () => {
    chatService.disconnectUser(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
