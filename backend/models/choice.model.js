const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Choice = sequelize.define(
  "choices",
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