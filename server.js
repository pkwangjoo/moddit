const express = require("express");
const connectDB = require("./config/db");
const ChatMessage = require("./models/ChatMessage");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

connectDB();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("server starting"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/forums", require("./routes/api/forums"));
app.use("/api/comments", require("./routes/api/comments"));
app.use("/api/chat", require("./routes/api/chat"));
app.use("/api/listing", require("./routes/api/listing"));
app.use("/api/dashboard", require("./routes/api/dashboard"));
app.use("/api/marketplace", require("./routes/api/marketplace"));
app.use("/api/module", require("./routes/api/module"));
app.use("/api/leaderboard", require("./routes/api/leaderboard"));

app.get("/", (req, res) => {
  res.send("API running");
});
//##################################################socket##########################################
io.on("connection", (socket) => {
  socket.on("sendMessage", async (msg, cb) => {
    try {
      let chatMessage = new ChatMessage({
        sender: msg.sender,
        text: msg.text,
        chatRoom: msg.chatRoom,
      });

      await chatMessage.save();

      await chatMessage.execPopulate("sender");
      if (msg.chatRoom) {
        io.to(msg.chatRoom._id).emit("message", chatMesssage);
      } else {
        io.emit("message", chatMessage);
      }
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("join", ({ room, user }, cb) => {
    console.log(user.name + " has joined the room " + room.name);
    socket.join(room._id);
  });

  socket.on("disconnectUser", ({user}) => {
    console.log(user.name + " disconnected");
    socket.disconnect();
  });
});
