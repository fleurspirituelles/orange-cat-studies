const mongoose = require("mongoose");

const tirinhaSchema = new mongoose.Schema(
  {
    id_user: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    id_album: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) =>
          /^https:\/\/picayune\.uclick\.com\/comics\/ga\/(197[8-9]|19[8-9]\d|20\d{2})\/ga\d{6}\.gif$/.test(
            v
          ),
        message:
          'The URL must follow the pattern "https://picayune.uclick.com/comics/ga/YYYY/gaYYMMDD.gif".',
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tirinha", tirinhaSchema);