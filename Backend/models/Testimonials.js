const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Testimonial = sequelize.define(
  "Testimonial",
  {
    testimonial_id: {
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
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        min: 1,
        max: 5,
      },
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
    tableName: "testimonial",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Testimonial.associate = (models) => {
    Testimonial.belongsTo(models.User, {
      foreignKey: "user_id",
      as: User,
    });
  };

module.exports = Testimonial;
