const express = require("express");
const router = express.Router();
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Forum = require("../../models/Forum");
const { check, validationResult } = require("express-validator");
const Module = require("../../models/Module");
const request = require("request");
const axios = require("axios");

router.post(
  "/",
  [check("modCode", "modCode is required").not().isEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const moduleCode = req.body.modCode.toUpperCase();

      const Url = `https://api.nusmods.com/v2/2018-2019/modules/${moduleCode}.json`;

      const response = await axios.get(Url);
      const data = response.data;

      const moduleInDatabase = await Module.exists({
        moduleCode: data.moduleCode,
      });

      if (moduleInDatabase) {
        console.log("this module was created before");
        const module = await Module.findOne({ moduleCode: data.moduleCode });
        return res.json(module);
      }

      const newForum = new Forum({
        title: data.title,
      });
      await newForum.save();

      const newModule = new Module({
        title: data.title,
        moduleCode: data.moduleCode,
        description: data.description,
        forum: newForum,
      });

      await newModule.save();

      res.json(newModule);
    } catch (err) {
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
