const { DataTypes } = require("sequelize");
const sequelize = require("../database/mysql");

const Topic = sequelize.define(
  "topic",
  {
    id_topic: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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

module.exports = Topic;