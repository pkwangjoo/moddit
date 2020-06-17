const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
  },

  major: {
    type: String,
  },

  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      autopopulate: true,
    },
  ],
});

profileSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Profile", profileSchema);
