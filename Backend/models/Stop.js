const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as needed
const Route = require("./Route"); // Adjust the path as needed

const Stop = sequelize.define(
  "Stop",
  {
    stop_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    stop_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
  },
  {
    tableName: "Stops",
    timestamps: false,
  }
);

module.exports = Stop;
