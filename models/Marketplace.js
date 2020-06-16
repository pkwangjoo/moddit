const mongoose = require("mongoose");

const marketplaceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mpost",
    },
  ]

  // file: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'File'
  // }

});

module.exports = mongoose.model("Marketplace", marketplaceSchema);
