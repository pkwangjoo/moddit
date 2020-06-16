const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const MPost = require("../../models/Mpost");
const { check, validationResult } = require("express-validator");

// @router GET
// @desc Gets all posts
router.get("/", isLoggedIn, async (req, res) => {
  try {
    let mposts = await MPost.find()
      .sort({ date: -1 })
      .populate('author', ['name', 'avatar'])
      .populate({
        path: 'mcomments',
        populate: { path: 'author', select: 'name' },
      });
    console.log(mposts);
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @router POST
// @desc Create a new MPost
router.post(
  "/",
  [
    isLoggedIn,
    [
      check("text", "text is required").not().isEmpty(),
      check("title", "title is required").not().isEmpty(),
      check("File", "File is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, text, file } = req.body;

      let newMPost = new MPost({
        title: title,
        text: text,
        author: req.user.id,
        file: file
      });

      await newMPost.save();
      res.json(newMPost);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @router DELETE
// @desc Deletes a post.
router.delete("/:mpost_id", isLoggedIn, async (req, res) => {
  try {
    const mpostID = req.params.mpost_id;

    const mpost = await MPost.findById(mpostID);

    if (!mpost.author._id === req.user.id) {
      return res.status(401).send("not allowed to delete");
    }

    await mpost.remove();
    res.json({ msg: "post was deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @router post
// @desc Updates a post.
router.post(
  "/:mpost_id",
  [
    isLoggedIn,
    [
      check("text", "text is required").not().isEmpty(),
      check("title", "title is required").not().isEmpty(),
      check("file", "File is require").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const mpostID = req.params.mpost_id;

      const mpost = await Post.findById(mpostID);

      const { text, title, file } = req.body;

      if (!post.author.equals(req.user.id)) {
        return res.status(401).send("not allowed to update");
      }

      await post.update({ text: text, title: title, file: file });

      res.json({ msg: "post updated" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

// @router POST
// @desc Adding likes to a post.
router.put("/:id/like", isLoggedIn, async (req, res) => {
  try {
    const mpost = await MPost.findById(req.params.id);

    if (mpost.likes.some((like) => like.user.equals(req.user.id))) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    mpost.likes.unshift({ user: req.user.id });

    await mpost.save();

    return res.json(mpost.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @router PUT
// @desc Remove likes
router.put("/:id/unlike", isLoggedIn, async (req, res) => {
  try {
    const mpost = await MPost.findById(req.params.id);

    if (!mpost.likes.some((like) => like.user.equals(req.user.id))) {
      return res.status(400).json({ msg: "Post not liked yet " });
    }

    post.likes = mpost.likes.filter(({ user }) => !user.equals(req.user.id));

    await mpost.save();

    return res.json(mpost.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @router GET
// @desc Gets a particular mpost
router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const mpost = await MPost.findById(req.params.id).populate({
      path: "mcomments",
      populate: { path: "author" },
    });
    return res.json(mpost);
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
