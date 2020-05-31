// const express = require("express");
// const router = express.Router();
// const auth = require("../../middleware/auth");
// const User = require("../../models/User");
// const jwt = require("jsonwebtoken");
// const config = require("config");
// const { check, validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");

// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("server errer");
//   }
// });

// router.post(
//   "/",
//   [
//     check("email", "must be valid email").isEmail(),
//     check("password", "please enter the password").exists(),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       const { email, password } = req.body;

//       let user = await User.findOne({ email });

//       if (!user) {
//         return res.status(400).json({ errors: ["invalid id/password"] });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         return res.status(400).json({ errors: ["invalid id/password"] });
//       }

//       const payload = {
//         user: {
//           id: user._id,
//         },
//       };

//       jwt.sign(
//         payload,
//         config.get("jwtToken"),
//         { expiresIn: 34000 },
//         (err, token) => {
//           if (err) {
//             throw err;
//           } else {
//             res.json({ token });
//           }
//         }
//       );
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Server error");
//     }
//   }
// );

// module.exports = router;
