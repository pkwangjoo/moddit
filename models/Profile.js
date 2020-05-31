const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  major: {
    type: String,
  },

  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
  ],
});

module.exports = mongoose.model("Profile", profileSchema);
