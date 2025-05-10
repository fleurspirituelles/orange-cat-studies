const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Album = sequelize.define(
  "albums",
  {
    id_album: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 12 },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 2000 },
    },
    total_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 28, max: 31 },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Album;