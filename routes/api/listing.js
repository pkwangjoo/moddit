const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Listing = require("../../models/Listing");
const ChatRoom = require("../../models/ChatRoom");
const { check, validationResult } = require("express-validator");

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
    console.log(listing);

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

      const { title, text, limit, tag } = req.body;

      const user = await User.findById(req.user.id);

      let newListing = new Listing({
        title: title,
        text: text,
        author: req.user.id,
        forum: req.params.forum_id,
        limit: limit,
        participants: [user],
        tag: tag,
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

    if (listing.limit && listing.participants.length >= listing.limit) {
      res.status(400).send("Listing is currently full");
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
        limit: listing.limit,
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

router.get("/user/:user_id", isLoggedIn, async (req, res) => {
  try {
    const listings = await Listing.find({ participants: req.params.user_id });

    res.json(listings);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.get("/forum/:forum_id/tag/:tag_name", isLoggedIn, async (req, res) => {
  try {
    const listings = await Listing.find({
      tag: req.params.tag_name,
      forum: req.params.forum_id,
    });

    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
