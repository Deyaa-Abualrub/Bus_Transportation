const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as needed
const Bus = require("./Bus"); // Adjust the path as needed

const GPSTracking = sequelize.define(
  "GPSTracking",
  {
    tracking_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Bus,
        key: "bus_id",
      },
      onDelete: "CASCADE",
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    speed: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    direction: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    altitude: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
  },
  {
    tableName: "gps_tracking",
    timestamps: false,
  }
);

module.exports = GPSTracking;
