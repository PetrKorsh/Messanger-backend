const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: true,
    },
    firstname: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    patronymic: {
      type: DataTypes.STRING(55),
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profile_picture_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    registration_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users", // Название таблицы в базе данных
    timestamps: false, // Не создавать автоматически поля createdAt и updatedAt
  }
);

// Экспортируем модель
module.exports = User;
