const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    require("./model/User");
    require("./model/Message");
    require("./model/Freinds");
    require("./model/Chat");

    // синхронизация моделей с БД
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connectDB, sequelize };
