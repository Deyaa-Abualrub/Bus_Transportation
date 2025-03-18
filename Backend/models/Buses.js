const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as needed
const User = require("./User"); // Adjust the path as needed
const Route = require("./Route"); // Adjust the path as needed

const Bus = sequelize.define(
  "Buses",
  {
    bus_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bus_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "user_id",
      },
      onDelete: "SET NULL",
    },
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Route,
        key: "route_id",
      },
      onDelete: "CASCADE",
    },
    gps_device: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "Buses",
    timestamps: false,
  }
);

module.exports = Bus;
