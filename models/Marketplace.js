const mongoose = require("mongoose");

const marketplaceSchema = new mongoose.Schema({

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

  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],

  // comments: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Comment",
  //     autopopulate: true,
  //   },
  // ],

  date: {
    type: Date,
    default: Date.now,
  },

  forum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Forum",
  },

  file: {
    type: String,
    // ref: 'upload.files',
    required: true
  },

  filename: {
    type: String,
    required: true
  }

});

marketplaceSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Marketplace", marketplaceSchema);
