const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");

router.get("/me", isLoggedIn, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "no such profile" });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//updating or creating the profile
router.post(
  "/",
  [isLoggedIn, [check("major", "Status is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //see if the profile exixsts,
    // if it does then update,
    // if not then just save

    const { major } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id;

    if (major) profileFields.major = major;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find().populate("user", ["name", "avatar"]);

    res.json(profiles);
  } catch (err) {
    console.log(err);

    res.status(500).send("server error");
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.user_id });

    if (!profile) {
      return res.status(400).send("no such profile");
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(500).send("no such user");
    }

    res.status(500).send("server error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "user was deleted" });
  } catch (err) {
    console.log(err.msg);
    res.status(500).send("server error");
  }
});

module.exports = router;
