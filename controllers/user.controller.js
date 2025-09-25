const User = require("../model/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const { Op } = require("sequelize");

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

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ login: login }, { email: email }],
        },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Пользователь с таким логином или email уже существует",
        });
      }

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
  async Authorization(req, res) {
    try {
      const { loginEmail, password } = req.body;
      const user = await User.findOne({
        where: { [Op.or]: [{ login: loginEmail }, { email: loginEmail }] },
      });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Пользователь не найден" });
      }

      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({
          success: false,
          message: "Неверный пароль",
        });
      }
      const token = generateToken(user.toJSON());

      res.json({
        success: true,
        token,
        user: {
          id: user.user_id,
          login: user.login,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ["user_id", "login", "email", "firstname", "lastname"],
      });

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      res.json({ success: true, user });
    } catch (error) {
      console.error("Ошибка профиля:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = new UserController();
