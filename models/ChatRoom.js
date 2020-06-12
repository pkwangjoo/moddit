const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
  ],
});

chatRoomSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("ChatRoom", chatRoomSchema);
