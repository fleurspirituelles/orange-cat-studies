const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Exam = sequelize.define(
  "exams",
  {
    id_exam: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    board: {
      type: DataTypes.STRING(50),
    },
    level: {
      type: DataTypes.STRING(50),
    },
    year: {
      type: DataTypes.INTEGER,
    },
    position: {
      type: DataTypes.STRING(100),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Exam;