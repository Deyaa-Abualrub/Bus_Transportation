module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      profile_id: {
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User, // Make sure this matches the actual table name in your database.
          key: "user_id",
        },
      },
    },
    {
      tableName: "profile",
      timestamps: false, // Disable if you don't need createdAt/updatedAt
    }
  );
};

module.exports = Profile;
