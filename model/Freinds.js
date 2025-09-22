const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const User = require("./User"); // смотри по структуре папок

const Freinds = sequelize.define(
  "Freinds",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    friend_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "user_friends",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "friend_id"], // уникальная пара (user_id, friend_id)
      },
    ],
  }
);

// связи: "многие-ко-многим"
User.belongsToMany(User, {
  through: Freinds,
  as: "Friends",
  foreignKey: "user_id",
  otherKey: "friend_id",
});

module.exports = Freinds;
