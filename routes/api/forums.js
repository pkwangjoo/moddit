const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Forum = require("../../models/Forum");
const { check, validationResult } = require("express-validator");

/**
 * Get all the forum
 */

router.get("/", async (req, res) => {
  try {
    let forums = await Forum.find();
    res.json(forums);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.post("/", isLoggedIn, async (req, res) => {
  try {
    const title = req.body.title;

    let newForum = new Forum({
      title,
    });

    await newForum.save();
    res.json(newForum);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

/**
 * Gets a particular forum
 */
router.get("/:forum_id", async (req, res) => {
  try {
    let forum = await Forum.findById(req.params.forum_id);
    res.json(forum);
  } catch (err) {
    console.log(err.message);

    res.status(500).send("server error");
  }
});

module.exports = router;
