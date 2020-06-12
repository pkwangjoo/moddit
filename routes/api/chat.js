const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const ChatMessage = require("../../models/ChatMessage");
const ChatRoom = require("../../models/ChatRoom");
const { check, validationResult } = require("express-validator");

//get chatmessages
router.get("/", isLoggedIn, async (req, res) => {
  await ChatMessage.find()
    .populate("sender")
    .exec((err, chats) => {
      if (err) return res.status(400).send(err);
      res.json(chats);
    });
});

router.get("/chatRoom/:chatroom_id/messages", async (req, res) => {
  try {
    let chatmessages = await ChatMessage.find({
      chatRoom: req.params.chatroom_id,
    });

    res.json(chatmessages);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.post("/chatRoom", isLoggedIn, async (req, res) => {
  try {
    const { name } = req.body;

    let chatRoom = new ChatRoom({
      name: name,
      users: [req.user.id],
    });

    await chatRoom.save();

    res.json(chatRoom);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//joining chat room
router.post("/chatRoom/:id", isLoggedIn, async (req, res) => {
  try {
    let chatRoom = await ChatRoom.findById(req.params.id);
    if (!chatRoom.user.includes(req.user.id)) {
      await ChatRoom.update({ user: [...chatRoom.user, req.user.id] });
    }

    res.json(ChatRoom);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//get all the chat rooms created
router.get("/chatRoom", isLoggedIn, async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find();

    res.json(chatRooms);
  } catch (err) {
    console.log(err.message);
    res.state(500).send("server error");
  }
});

//get a particular chatroom
router.get("/chatRoom/:id", isLoggedIn, async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id);

    res.json(chatRoom);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.get("/chatRoom/:id/users", async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id);

    const users = chatRoom.users;

    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
