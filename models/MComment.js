const mongoose = require("mongoose");

const mcommentSchema = new mongoose.Schema({
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
  replies: [
    {
      commentReplies: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MCommentReply",
      },
    },
  ],
});

module.exports = mongoose.model("MComment", commentSchema);
