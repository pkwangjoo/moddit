const express = require("express");
const router = express.Router({ mergeParams: true });
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const { check, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  res.send("comments route");
});

router.post(
  "/",
  [isLoggedIn, check("text", "type a comment").not().isEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const text = req.body.text;

      const newComment = new Comment({
        author: req.user.id,
        text: text,
      });

      await newComment.save();

      let post = await Post.findById(req.params.id).populate("comments");

      post.comments.push(newComment);

      await post.save();

      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

router.delete("/:comment_id", isLoggedIn, async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.comment_id);

    if (!comment.author.equals(req.user.id)) {
      return res.json(401).send("not authorised");
    }

    await comment.remove();
    res.json({ msg: "comment deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

router.post(
  "/:comment_id",
  [isLoggedIn, check("text", "updating text cannot be empty").not().isEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let comment = await Comment.findById(req.params.comment_id);
      if (!comment.author.equals(req.user.id)) {
        return res.json(401).send("not authorised");
      }

      await comment.update({ text: req.body.text });

      res.json({ msg: "comment updated" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
