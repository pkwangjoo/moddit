const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const { check, validationResult } = require("express-validator");

/**
 * Gets all the posts
 */
router.get("/", isLoggedIn, async (req, res) => {
  try {
    let posts = await Post.find()
      .sort({ date: -1 })
      .populate("author", ["name", "avatar"])
      .populate({
        path: "comments",
        populate: { path: "author", select: "name" },
      });
    console.log(posts);
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

/**
 * Create a new post
 */
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

/**
 * Deletes a particular post
 */
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

/**
 * Updates a particular post
 */
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

/**
 * Add likkes to a particular post
 */
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

/**
 * Remove likes from a particular post
 */
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

/**
 * Gets a particular post
 */
router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    await post.execPopulate({
      path: "comments",
      populate: { path: "author" },
    });

    return res.json(post);
  } catch (err) {
    console.log(err.message);

    res.status(500).send("server error");
  }
});

router.post(
  "/:id/comments",
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

      let post = await Post.findById(req.params.id);

      post.comments.push(newComment);

      await post.execPopulate({
        path: "comments",
        populate: { path: "author" },
      });

      await post.save();
      post.comments.sort();
      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

/**
 * Gets all comments from a particular post
 */
router.get("/:id/comments/", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    await post.execPopulate({
      path: "comments",
      populate: { path: "author" },
      populate: { path: "replies", populate: { path: "author" } },
    });

    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

/**
 * Gets all the post inside a forum
 */
router.get("/forum/:forum_id", isLoggedIn, async (req, res) => {
  try {
    let posts = await Post.find({ forum: req.params.forum_id }).sort({
      date: -1,
    });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

/**
 * Create a new post inside a forum
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

      let newPost = new Post({
        title: title,
        text: text,
        author: req.user.id,
        forum: req.params.forum_id,
      });

      await newPost.save();

      res.json(newPost);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
