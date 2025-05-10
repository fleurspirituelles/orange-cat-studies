const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const QuestionTopic = sequelize.define(
  "question_topic",
  {
    id_question: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_topic: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = QuestionTopic;