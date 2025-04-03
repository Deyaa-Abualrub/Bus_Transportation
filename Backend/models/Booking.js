const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Bus = require("./Buses");

const Booking = sequelize.define(
  "Booking",
  {
    booking_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
      onDelete: "CASCADE",
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
    seat_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // departure_location: {
    //   type: DataTypes.STRING(255),
    //   allowNull: false,
    // },
    // arrival_location: {
    //   type: DataTypes.STRING(255),
    //   allowNull: false,
    // },
    // departure_time: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
  },
  {
    tableName: "Bookings",
    timestamps: false,
  }
);

module.exports = Booking;
