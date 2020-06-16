const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({}, {strict: false}, 'upload.files');

module.exports = mongoose.model("File", fileSchema);
