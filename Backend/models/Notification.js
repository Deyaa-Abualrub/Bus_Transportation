const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // تأكد من استيراد اتصال قاعدة البيانات

const Notification = sequelize.define(
  "Notification",
  {
    notification_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // اسم الجدول الذي يرتبط به المفتاح الخارجي
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    bus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Buses", // اسم الجدول الذي يرتبط به المفتاح الخارجي
        key: "bus_id",
      },
      onDelete: "CASCADE",
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "notifications",
    timestamps: false, // تجنب إضافة createdAt و updatedAt تلقائيًا
  }
);

module.exports = Notification;
