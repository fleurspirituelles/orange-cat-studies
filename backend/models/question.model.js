const { DataTypes } = require("sequelize");
const sequelize = require("../database/mysql");

const Question = sequelize.define(
  "question",
  {
    id_question: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_exam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statement: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer_key: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      validate: {
        isIn: [["A", "B", "C", "D", "E"]],
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Question;