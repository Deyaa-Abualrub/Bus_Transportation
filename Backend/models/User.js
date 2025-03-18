const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Bus = require("./Buses");

const User = sequelize.define(  
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["user", "driver", "admin"]],
      },
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true, // ✅ السماح بأن يكون NULL
      defaultValue: null, // ✅ التأكد من أن القيمة الافتراضية NULL
      validate: {
        isIn: [["pending", "approved", "rejected", null]],
        checkStatus(value) {
          if (this.role === "driver" && !value) {
            throw new Error(
              "Drivers must have a status (pending, approved, rejected)."
            );
          }
          if (this.role !== "driver" && value !== null) {
            throw new Error("Only drivers can have a status.");
          }
        },
      },
    },
    license_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
      validate: {
        checkDriverLicense(value) {
          if (this.role === "driver" && !value) {
            throw new Error("Drivers must have a license number.");
          }
        },
      },
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
  },
  {
    tableName: "User",
    timestamps: false,
  }
);

module.exports = User;
