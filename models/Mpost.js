const mongoose = require("mongoose");

const mpostSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true,
  },

  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },

  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MComment",
      autopopulate: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  marketplace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Marketplace",
  },
});

postSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("MPost", postSchema);
