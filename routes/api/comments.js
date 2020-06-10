const express = require("express");
const router = express.Router({ mergeParams: true });
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const CommentReply = require("../../models/CommentReply");
const { check, validationResult } = require("express-validator");

/**
 * Deletes a particular comment
 */
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

/**
 * Edits a particular comment
 */
router.put(
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

/**
 * Adds like to a particular comment
 */
router.put("/:comment_id/like", isLoggedIn, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.comment_id);

    if (comment.likes.some((like) => like.user.equals(req.user.id))) {
      return res.status(400).json({ msg: "comment already liked" });
    }

    comment.likes.unshift({ user: req.user.id });

    await comment.save();

    return res.json(comment.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * Remove likes from a particular comment
 */
router.put("/:comment_id/unlike", isLoggedIn, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.comment_id);

    if (!comment.likes.some((like) => like.user.equals(req.user.id))) {
      return res.status(400).json({ msg: "comment not liked yet " });
    }

    comment.likes = comment.likes.filter(
      ({ user }) => !user.equals(req.user.id)
    );

    await comment.save();

    return res.json(comment.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//adding replies to a particular comment
router.post("/:comment_id", isLoggedIn, async (req, res) => {
  try {
    const { text } = req.body;

    const commentReply = new CommentReply({
      author: req.user.id,
      text: text,
    });

    await commentReply.save();

    let comment = await Comment.findById(req.params.comment_id);

    comment.replies.push(commentReply);

    await comment.save();

    await comment.execPopulate({
      path: "replies",
      populate: { path: "author" },
    });

    res.json(comment.replies);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

/**
 * Get a particular comment
 */
router.get("/:comment_id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.comment_id);

    await comment.execPopulate({
      path: "replies",
      populate: { path: "author" },
    });

    res.json(comment);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
