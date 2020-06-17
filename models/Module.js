const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  moduleCode: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  forum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Forum",
    autopopulate: true,
  },
});

moduleSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Module", moduleSchema);
