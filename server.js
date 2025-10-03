const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const userRouters = require("./routes/user.routes");
const chatRouters = require("./routes/chat.routes");
const sessionMiddleware = require("./middleware/session");
const chatService = require("./services/chat.services");

const app = express();

app.use(sessionMiddleware);
app.use(cors());
app.use(express.json());
app.use(cookie());

app.use("/api", userRouters);
app.use("/chats", chatRouters);

module.exports = app;
