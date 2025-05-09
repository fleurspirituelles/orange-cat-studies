const { DataTypes } = require("sequelize");
const sequelize = require("../database/mysql");

const Review = sequelize.define(
  "review",
  {
    id_review: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_question: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    marked_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Review;