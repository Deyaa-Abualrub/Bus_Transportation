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
      identity_img: {
        type: DataTypes.STRING(255),
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
        onDelete: "SET NULL", // عندما يتم حذف سجل من جدول Buses، سيتم تعيين هذا العمود إلى NULL
      },
      isdeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "driver",
      timestamps: false, 
    }
  );

module.exports = Driver;
