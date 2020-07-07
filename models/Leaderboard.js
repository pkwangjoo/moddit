const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: true,
  },
  
  posts: {
      type: Number,
      default: 0,
  },

  marketplace: {
    type: Number,
    default: 0,
  },

  comments: {
    type: Number,
    default: 0,
  },

  points: {
    type: Number,
    default: 0,
  }
  
});

leaderboardSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Leaderboard", leaderboardSchema);
