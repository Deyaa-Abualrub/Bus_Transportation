const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as needed

const Route = sequelize.define(
  "Route",
  {
    route_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    route_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    start_point: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    end_point: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "routes",
    timestamps: false,
  }
);

module.exports = Route;
