const express = require("express");
const router = express.Router();
const fs = require("fs");
// const bodyParser = require('body-parser');
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Marketplace = require("../../models/Marketplace");
const File = require("../../models/File");
const Comment = require("../../models/Comment");
const Leaderboard = require("../../models/Leaderboard");
// const File = require('../../models/File');
// const methodOverride = require('method-override');
const db = require("../../config/default.json");
const mongoURI = db.mongoURI;
const { check, validationResult } = require("express-validator");
const { disconnect, send } = require("process");

// Create Mongo Connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create Storage
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// @router GET
// @desc Get all Marketplace Posts
// router.get('/', async (req, res) => {
//     try {
//         let marketplace = await Marketplace.find();
//         res.json(marketplace);
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// @router GET
// @desc Gets all the posts
router.get("/", isLoggedIn, async (req, res) => {
  try {
    let marketplace = await Marketplace.find().sort({ date: -1 });
    console.log(marketplace);
    res.json(marketplace);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/user/:user_id", isLoggedIn, async (req, res) => {
  try {
    const marketplaces = await Marketplace.find({ author: req.params.user_id });
    res.json(marketplaces);
  } catch (err) {
    res.status(500).send("server error");
  }
});

// @router POST
// @desc Creates a new marketplace
router.post(
  "/",
  [
    isLoggedIn,
    [
      check("text", "text is require").not().isEmpty(),
      check("title", "title is require").not().isEmpty(),
      check("file", "file is required").not().isEmpty(),
    ],
    upload.array("file", 3),
  ],

  async (req, res) => {
    try {
      const { title, text } = req.body;

      let newMarketplace = new Marketplace({
        title: title,
        text: text,
        files: [],
        author: req.user.id,
      });

      let newLeaderboard = await Leaderboard.findOneAndUpdate(
        { author: req.user.id },
        { $inc: { marketplace: 1, points: 10 } },
        { new: true, upsert: true }
      );

      req.files.forEach(async function (item, index) {
        try {
          let newFile = new File({
            file: item.filename,
            filename: item.originalname,
          });

          newMarketplace.files.push(newFile);
          await newFile.save();
        } catch (err) {
          // console.log(err.message);
          res.status(500).send("Server Error");
        }
      });

      await newMarketplace.save();
      res.json(newMarketplace);
    } catch (err) {
      // console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@router DELETE
//@desc Deletes a marketplace
router.delete("/:marketplace_id", isLoggedIn, async (req, res) => {
  try {
    const marketplace = await Marketplace.findById(req.params.marketplace_id);

    gfs.remove({ _id: req.params.marketplace_id, root: "uploads" }, function (
      err
    ) {
      if (err) {
        return res.status(500).send("Server Error");
      }
    });

    if (!marketplace.author._id === req.user.id) {
      return res.status(401).send("Not allowed to delete");
    }

    let newLeaderboard = await Leaderboard.findOneAndUpdate(
      { author: req.user.id },
      { $inc: { marketplace: -1, points: -10 } },
      { new: true, upsert: true }
    );

    await marketplace.remove();
    res.json({ msg: "Post was deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@router PUT
//@desc Add likes to a marketplace
router.put("/:marketplace_id/like", isLoggedIn, async (req, res) => {
  try {
    const marketplace = await Marketplace.findById(req.params.marketplace_id);

    if (marketplace.likes.some((like) => like.user.equals(req.user.id))) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    marketplace.likes.unshift({ user: req.user.id });

    await marketplace.save();

    return res.json(marketplace.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@router PUT
//@desc Removes likes from a marketplace
router.put("/:marketplace_id/unlike", isLoggedIn, async (req, res) => {
  try {
    const marketplace = await Marketplace.findById(req.params.marketplace_id);

    if (!marketplace.likes.some((like) => like.user.equals(req.user.id))) {
      return res.status(400).json({ msg: "Post not liked yet" });
    }

    marketplace.likes = marketplace.likes.filter(
      ({ user }) => !user.equals(req.user.id)
    );

    await marketplace.save();

    return res.json(marketplace.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// router.get("/:marketplace_id", (req, res) => {
//   gfs.files.findOne({ filename: req.params.marketplace_id }, (err, file) => {
//     if (!file || file.length === 0) {
//       return res.status(404).json("File does not exists");
//     }
//     return res.json(file);
//   });
// });

router.get("/:marketplace_id/download", (req, res) => {
  // Check file exists on DB
  var filename = req.params.marketplace_id;
  gfs.files.findOne({ filename: filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).send("File Not Found");
    }
    var readstream = gfs.createReadStream({ filename: filename });
    readstream.pipe(res);
  });
});

/**
 * POSTS a marketplace inside a forum
 *
 */
router.post(
  "/forum/:forum_id",
  [
    isLoggedIn,
    [
      check("text", "text is required").not().isEmpty(),
      check("title", "title is required").not().isEmpty(),
      check("files", "file is required").not().isEmpty(),
    ],
    upload.any("file"),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req.body);

      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      // }

      const { title, text, tag } = req.body;

      let newMarketplace = new Marketplace({
        title: title,
        text: text,
        files: [],
        author: req.user.id,
        forum: req.params.forum_id,
        tag: tag,
      });

      let newLeaderboard = await Leaderboard.findOneAndUpdate(
        { author: req.user.id },
        { $inc: { marketplace: 1, points: 10 } },
        { new: true, upsert: true }
      );

      req.files.forEach(async function (item, index) {
        try {
          let newFile = new File({
            file: item.filename,
            filename: item.originalname,
          });

          newMarketplace.files.push(newFile);
          await newFile.save();
        } catch (err) {
          console.log(err.message);
          // res.status(500).send('Server Error');
        }
      });

      await newMarketplace.save();

      console.log(newMarketplace);
      res.json(newMarketplace);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * GETS all the markplace posts from a forum
 */

router.get("/forum/:forum_id", isLoggedIn, async (req, res) => {
  try {
    let marketplace = await Marketplace.find({
      forum: req.params.forum_id,
    }).sort({ date: -1 });

    res.json(marketplace);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * Gets marketplace by tags
 */

router.get("/forum/:forum_id/tag/:tag_name", isLoggedIn, async (req, res) => {
  try {
    const marketplaces = await Marketplace.find({
      tag: req.params.tag_name,
      forum: req.params.forum_id,
    });

    res.json(marketplaces);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

/**
 * SELECTS a marketplace
 *
 */

router.get("/:marketplace_id", isLoggedIn, async (req, res) => {
  try {
    const marketplace = await Marketplace.findById(req.params.marketplace_id);

    res.json(marketplace);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

/**
 * Adds comments
 */

router.post(
  "/:marketplace_id/comments",
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

      let marketplace = await Marketplace.findById(req.params.marketplace_id);

      marketplace.comments.push(newComment);

      let newLeaderboard = await Leaderboard.findOneAndUpdate(
        { author: req.user.id },
        { $inc: { comments: 1, points: 1 } },
        { new: true, upsert: true }
      );

      await marketplace.save();

      res.json(marketplace.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

router.get("/:marketplace_id/comments", isLoggedIn, async (req, res) => {
  try {
    const marketplace = await Marketplace.findById(req.params.marketplace_id);
    await marketplace.execPopulate({
      path: "comments",
      populate: { path: "author" },
      populate: { path: "replies", populate: { path: "author" } },
    });

    res.json(marketplace.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
