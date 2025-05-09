const mongoose = require("mongoose");

const comicSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  id_user: {
    type: Number,
    required: true,
  },
  id_album: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Comic", comicSchema);