const mongoose = require("mongoose");

const commentReplySchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = mongoose.model("CommentReply", commentReplySchema);
