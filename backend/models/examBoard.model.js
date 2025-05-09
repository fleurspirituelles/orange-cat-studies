const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ExamBoard = sequelize.define(
  "exam_board",
  {
    id_exam_board: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ExamBoard;