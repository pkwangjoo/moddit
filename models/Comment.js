const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
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
        ref: "CommentReply",
      },
    },
  ],
});

module.exports = mongoose.model("Comment", commentSchema);
