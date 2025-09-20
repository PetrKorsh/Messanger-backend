const { pool } = require("../db");

class UserController {
  async createUser(req, res) {
    try {
      const userData = req.body;
      const existingUser = await pool.query(
        `SELECT user_id FROM users 
         WHERE login = $1 OR email = $2`,
        [userData.login, userData.email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({
          error: "Пользователь с таким Логином или Email уже существует",
        });
      }

      const result = await pool.query(
        `INSERT INTO users 
         (login, firstname, lastname, patronymic, bio, email, password_hash, profile_picture_url) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING user_id, login, email, registration_date`,
        [
          userData.login,
          userData.firstname,
          userData.lastname,
          userData.patronymic || null,
          userData.bio || null,
          userData.email,
          userData.password_hash,
          userData.profile_picture_url || null,
        ]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      if (error.code === "23505") {
        return res.status(400).json({ error: "User already exists" });
      }

      console.error("Create user error:", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await pool.query(`Select * from users`);
      res.json(users.rows);
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
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
