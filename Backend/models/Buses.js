const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Route = require("./Route");
const Driver = require("./Driver");
const Booking = require("./Booking");

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
    seat_available: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 50,
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Driver,
        key: "driver_id",
      },
      onDelete: "SET NULL",
    },
    route_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Route,
        key: "route_id",
      },
      onDelete: "CASCADE",
    },
    bus_route: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    launch_date: {
      type: DataTypes.DATE, 
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    gps_device: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: [[1, 2, 3 , 4]],
      },
    },
    status_change_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    bus_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue:
        "https://themeenergy.com/themes/html/transfers/images/uploads/bus.jpg", // Default image URL
    },
  },
  {
    tableName: "buses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Hook to update status_change_time when status changes from 2 to 3 or 2 to 1
Bus.beforeUpdate((bus, options) => {
  if (
    bus._changed.status &&
    (bus.status === 1 || bus.status === 3) &&
    bus._previousDataValues.status === 2
  ) {
    bus.status_change_time = new Date(new Date().getTime() + 15 * 60000);
  }
});

Bus.belongsTo(Driver, { foreignKey: "driver_id", as: "driver" });
Driver.hasOne(Bus, { foreignKey: "driver_id", as: "bus" });

module.exports = Bus;

