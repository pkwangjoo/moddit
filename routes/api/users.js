const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const passport = require("passport");

const User = require("../../models/User");

router.get("/", (req, res) => {
  res.send("users route");
});

router.post(
  "/register",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "must be valid email").isEmail(),
    check("password", "password must be 6 characters or longer").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      let user = await User.findOne({ email });

      if (user) {
        return res.status(500).json({ errors: ["User already exists"] });
      }

      const avatar = gravatar.url(email);

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/api/users",
    failureRedirect: "/api/users/failed",
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("logged out");
});

//just to test in json
router.get("/failed", (req, res) => {
  res.send("failed log in");
});

router.get("/login", (req, res) => {
  res.send("post to log in");
});

module.exports = router;
