const { DataTypes } = require("sequelize");
const sequelize = require("../database/mysql");

const Answer = sequelize.define(
  "answer",
  {
    id_answer: {
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
    selected_choice: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      validate: {
        isIn: [["A", "B", "C", "D", "E"]],
      },
    },
    answer_time: {
      type: DataTypes.INTEGER,
    },
    answer_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Answer;