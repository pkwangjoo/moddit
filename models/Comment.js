const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentReply",
      autopopulate: true,
    },
  ],
});

commentSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Comment", commentSchema);
