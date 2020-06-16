const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Listing = require("../../models/Listing");
const ChatRoom = require("../../models/ChatRoom");
const { check, validationResult } = require("express-validator");

router.get("/posts", isLoggedIn, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.get("/listings", isLoggedIn, async (req, res) => {
  try {
    const listings = await Listing.find({ participants: req.user.id });

    res.json(listings);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
