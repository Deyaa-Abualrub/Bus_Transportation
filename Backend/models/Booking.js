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
    bus_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      // references: {
      //   model: Bus,
      //   key: "bus_number", // تأكد من أن الباص نيم يتناسب مع الجدول
      // },
      onDelete: "CASCADE",
    },
    seat_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("credit_card", "paypal", "cash"),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "pending", // Default value as 'pending'
    },
  },
  {
    tableName: "bookings",
    timestamps: false,
  }
);

// Booking.belongsTo(Bus, {
//   foreignKey: "bus_number", // العمود في جدول Booking الذي يحوي القيمة
//   targetKey: "bus_number", // العمود في جدول Bus الذي نقارن به
// });

module.exports = Booking;

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
