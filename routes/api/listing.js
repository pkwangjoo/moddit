const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Listing = require("../../models/Listing");
const ChatRoom = require("../../models/ChatRoom");
const { check, validationResult } = require("express-validator");
const { model } = require("../../models/Listing");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const listings = await Listing.find();

    res.json(listings);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

router.get("/:listing_id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listing_id);

    res.json(listing);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.get("/forum/:forum_id", isLoggedIn, async (req, res) => {
  try {
    let listings = await Listing.find({ forum: req.params.forum_id }).sort({
      date: -1,
    });
    res.json(listings);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

/**
 * Create a new listing inside a forum
 */
router.post(
  "/forum/:forum_id",
  [
    isLoggedIn,
    [
      check("text", "text is required").not().isEmpty(),
      check("title", "title is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, text } = req.body;

      let newListing = new Listing({
        title: title,
        text: text,
        author: req.user.id,
        forum: req.params.forum_id,
      });

      await newListing.save();

      res.json(newListing);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

router.delete("/:listing_id", isLoggedIn, async (req, res) => {
  try {
    const listingID = req.params.listing_id;

    const listing = await Listing.findById(listingID);

    if (!listing.author._id === req.user.id) {
      return res.status(401).send("not allowed to delete");
    }

    await listing.remove();
    res.json({ msg: "post was deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.post("/:listing_id/participants", isLoggedIn, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listing_id);
    const user = await User.findById(req.user.id);

    var userExists = false;
    for (let i = 0; i < listing.participants.length; i++) {
      if (listing.participants[i].equals(user)) {
        userExists = true;
        break;
      }
    }
    if (!userExists) {
      console.log("unique user");
      await listing.updateOne({
        participants: listing.participants.concat(user),
      });
    }

    res.json(listing.participants);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.post("/:listing_id/chatRoom", isLoggedIn, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listing_id);

    if (!listing.ChatRoom) {
      const newChatRoom = new ChatRoom({
        name: req.body.name,
      });

      await newChatRoom.save();

      listing.chatRoom = newChatRoom;

      await listing.save();

      res.json(listing);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

module.exports = router;
