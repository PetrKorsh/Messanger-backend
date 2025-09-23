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
  async getUsers(req, res) {
    // Тут должен вызов к функции в который я буду описывать сому валидацию через express-validator
  }
}

module.exports = new UserController();
