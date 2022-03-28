const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middleware/auth");
const Leaderboard = require("../../models/Leaderboard");
const { check, validationResult } = require("express-validator");

// @router GET
// @desc Gets all the leaderboard
router.get("/", async (req, res) => {
  try {
    let leaderboard = await Leaderboard.find().sort({ posts: -1 });
    res.json(leaderboard);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @router GET
// @desc Gets leaderboard by userid
router.get("/:user_id", async (req, res) => {
  try {
    let newLeaderboard = await Leaderboard.findOneAndUpdate({ author: req.params.user_id }, { $inc: { posts: 0 } }, { new: true, upsert: true });
    res.json(newLeaderboard); 
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;