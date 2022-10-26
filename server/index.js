const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const socket = require("socket.io");

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(messageRoutes);


app.get('/', (request, response) => {
  response.send("Chat app")
})

const server = app.listen(process.env.PORT, () =>
  console.log(`Servidor iniciado em ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map()

io.on ("connection", (socket) => {
  global.chatSocket = socket
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id)
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  })
})