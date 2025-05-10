const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Performance = sequelize.define(
  "performance",
  {
    id_performance: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    question_count: {
      type: DataTypes.INTEGER,
      validate: { min: 0 },
    },
    correct_count: {
      type: DataTypes.INTEGER,
      validate: { min: 0 },
    },
    average_answer_time: {
      type: DataTypes.INTEGER,
    },
    most_wrong_topic: {
      type: DataTypes.STRING(100),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Performance;