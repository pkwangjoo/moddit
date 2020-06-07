const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    let posts = await Post.find()
      .sort({ date: -1 })
      .populate("author", ["name", "avatar"])
      .populate({
        path: "comments",
        populate: { path: "author", select: "name" },
      });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.post(
  "/",
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

      let newPost = new Post({
        title: title,
        text: text,
        author: req.user.id,
      });

      await newPost.save();
      res.json(newPost);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

router.delete("/:post_id", isLoggedIn, async (req, res) => {
  try {
    const postID = req.params.post_id;

    const post = await Post.findById(postID);

    if (!post.author._id === req.user.id) {
      return res.status(401).send("not allowed to delete");
    }

    await post.remove();
    res.json({ msg: "post was deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.post(
  "/:post_id",
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
      const postID = req.params.post_id;

      const post = await Post.findById(postID);

      const { text, title } = req.body;

      if (!post.author.equals(req.user.id)) {
        return res.status(401).send("not allowed to update");
      }

      await post.update({ text: text, title: title });

      res.json({ msg: "post updated" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

router.put("/:id/like", isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.some((like) => like.user.equals(req.user.id))) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.put("/:id/unlike", isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.some((like) => like.user.equals(req.user.id))) {
      return res.status(400).json({ msg: "Post not liked yet " });
    }

    post.likes = post.likes.filter(({ user }) => !user.equals(req.user.id));

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments");
    return res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
