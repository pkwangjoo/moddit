const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
  ],
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  forum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Forum",
  },
  chatRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatRoom",
    autopopulate: true,
  },
});

listingSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Listing", listingSchema);
