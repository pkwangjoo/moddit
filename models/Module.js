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
});

module.exports = mongoose.model("Module", moduleSchema);
