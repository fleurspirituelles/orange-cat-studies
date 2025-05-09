const { DataTypes } = require("sequelize");
const sequelize = require("../database/mysql");

const Exam = sequelize.define(
  "Exam",
  {
    id: {
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Exam;
