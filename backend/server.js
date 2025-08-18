const express = require("express");
const singleplayerMatchup = require("./events/singleplayerMatchup");
const http = require("http");
const { Server } = require("socket.io");

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

singleplayerMatchup.attachMatchupListener(io);
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("singleplayerMatchup", (msg) =>
    singleplayerMatchup.singleplayerMatchup(msg)
  );

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Socket.IO server running on http://localhost:3000");
});
