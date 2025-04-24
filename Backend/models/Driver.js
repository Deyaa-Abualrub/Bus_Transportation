const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Bus = require("./Buses");

const Driver = sequelize.define(
  "Driver",
  {
    driver_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    license_img: {
      type: DataTypes.STRING(255),
    },
    non_conviction_img: {
      type: DataTypes.STRING(255),
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(20),
    },
    bus_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Bus,
        key: "bus_id",
      },
      onDelete: "SET NULL",
    },
    isdeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false, 
      defaultValue: "pending",
      validate: {
        isIn: [["pending", "approved", "rejected"]],
      },
    },
  },
  {
    tableName: "driver",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);


module.exports = Driver;
