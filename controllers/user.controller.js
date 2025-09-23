const { pool } = require("../db");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

class UserController {
  async createUser(req, res) {
    try {
      const {
        login,
        firstname,
        lastname,
        patronymic,
        bio,
        email,
        password,
        profile_picture_url,
      } = req.body;

      const password_hash = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        login,
        firstname,
        lastname,
        patronymic,
        bio,
        email,
        password: password_hash,
        profile_picture_url,
      });

      const token = generateToken(newUser);

      res.status(201).json({
        success: true,
        token,
        user: {
          id: newUser.user_id,
          login: newUser.login,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
  async getUsers(req, res) {
    // Тут должен вызов к функции в который я буду описывать сому валидацию через express-validator
  }
  async getOneUser(req, res) {
    try {
      const id = req.params.id;
      const user = await pool.query(`Select * from users where user_id = $1`, [
        id,
      ]);

      if (!user.rows.length) {
        console.log(`Такой пользователь не найден: ${id}`);
        return res.status(400).json({ error: "Пользователь не найден" });
      }
      res.json(user.rows[0]);
    } catch (error) {
      console.error(`Ошибка получения пользователя ID ${req.params.id}:`, {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });

      res.status(500).json({
        error: "Внутренняя ошибка сервера",
      });
    }
  }
  async updateUser(req, res) {
    try {
      const { id, firstname, lastname, patronymic } = req.body;

      const userExists = await pool.query(
        `SELECT * FROM users WHERE user_id = $1`,
        [id]
      );

      if (!userExists.rows.length) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      const user = await pool.query(
        `UPDATE users SET firstName = $1, lastName = $2, patronymic = $3 
       WHERE user_id = $4 RETURNING *`,
        [firstname, lastname, patronymic || null, id]
      );

      console.log(`Данные пользователя обновлены: ID ${id}`);
      res.json({
        message: "Данные пользователя успешно обновлены",
        user: user.rows[0],
      });
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error);
      res.status(500).json({ error: "Ошибка сервера при обновлении данных" });
    }
  }
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      if (!user.rows.length) {
        console.log(`Такой пользователь не найден: ${id}`);
        return res.status(400).json({ error: "Пользователь не найден" });
      }
      const user = await pool.query(`DELETE from users where user_id = $1`, [
        id,
      ]);
      res.json(user.rows[0]);
    } catch (error) {
      console.error(`Ошибка удаления пользователя ID ${req.params.id}:`, {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });

      res.status(500).json({
        error: "Внутренняя ошибка сервера",
      });
    }
  }
}

module.exports = new UserController();
