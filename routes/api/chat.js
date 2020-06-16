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

router.get("/chatRoom/:chatroom_id/messages", isLoggedIn, async (req, res) => {
  try {
    // const chatRoom = await ChatRoom.findById(req.params.chatroom_id);
    // const currUser = await User.findById(req.user.id);

    // var userInChatRoom = false;

    // for (let i = 0; i < chatRoom.users.length; i++) {
    //   if (chatRoom.users[i].equals(currUser)) {
    //     userInChatRoom = true;
    //     break;
    //   }
    // }

    // if (!userInChatRoom) {
    //   return res
    //     .status(400)
    //     .send("The current user is not authorised to view to messages");
    // }

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

router.post("/chatRoom/private", isLoggedIn, async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.body;

    const sender = await User.findById(sender_id);
    const receiver = await User.findById(receiver_id);

    const chatRoom = new ChatRoom({
      name: `${sender.name} and ${receiver.name}s' chat`,
      users: [sender_id, receiver_id],
      private: true,
    });

    await chatRoom.save();

    res.json(chatRoom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/chatRoom/private/:user_id", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    const chatRooms = await ChatRoom.find({ users: user, private: true });

    res.json(chatRooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//joining chat room
router.post("/chatRoom/:id", isLoggedIn, async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id);
    const user = await User.findById(req.user.id);

    var userExists = false;
    for (let i = 0; i < chatRoom.users.length; i++) {
      if (chatRoom.users[i].equals(user)) {
        userExists = true;
        break;
      }
    }

    if (chatRoom.limit && chatRoom.limit >= chatRoom.users.length) {
      return res.status(400).send("the chatroom is full");
    }
    if (!userExists) {
      console.log("unique user");
      await chatRoom.updateOne({
        users: chatRoom.users.concat(user),
      });
    }

    res.json(chatRoom);
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
