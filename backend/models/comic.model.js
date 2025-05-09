const mongoose = require("mongoose");

const comicSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  dia: {
    type: Number,
    required: true,
    min: 1,
    max: 31,
  },
  mes: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  ano: {
    type: Number,
    required: true,
    min: 1978,
    max: 2099,
  },
});

module.exports = mongoose.model("comic", comicSchema);