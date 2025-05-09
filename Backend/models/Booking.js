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
      onDelete: "CASCADE",
    },
    seat_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("cash", "paypal", "credit", "visa"),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "pending",
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "bookings",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Booking.belongsTo(Bus, {
  foreignKey: "bus_number",
  targetKey: "bus_number",
  as: "bus",
});

Booking.belongsTo(User, { foreignKey: "user_id" });

module.exports = Booking;

