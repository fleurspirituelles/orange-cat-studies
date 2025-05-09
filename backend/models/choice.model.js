const { DataTypes } = require("sequelize");
const sequelize = require("../database/mysql");

const Choice = sequelize.define(
  "choice",
  {
    id_choice: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_question: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    letter: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      validate: {
        isIn: [["A", "B", "C", "D", "E"]],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Choice;