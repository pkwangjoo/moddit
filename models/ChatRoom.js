const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
  ],

  limit: {
    type: Number,
  },
  private: {
    type: Boolean,
    default: false,
  },
});

chatRoomSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("ChatRoom", chatRoomSchema);
