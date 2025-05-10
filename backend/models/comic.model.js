const mongoose = require("mongoose");

const comicSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
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

comicSchema.index({ code: 1, id_user: 1, id_album: 1 }, { unique: true });

module.exports = mongoose.model("Comic", comicSchema);