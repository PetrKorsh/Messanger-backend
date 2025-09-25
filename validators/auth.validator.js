const { body } = require("express-validator");

const authValidator = [
  body("loginEmail").notEmpty().withMessage("Логин или Email обязательны"),
  body("password").notEmpty().withMessage("Пароль обязателен"),
];

module.exports = authValidator;
