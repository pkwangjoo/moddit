const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
  },
  text: {
    type: String,
    required: true,
  },

  chatRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatRoom",
    autopopulate: true,
  },
});

chatMessageSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("ChatMessage", chatMessageSchema);
