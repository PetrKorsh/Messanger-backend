const { body } = require("express-validator");

const userValidator = [
  body("login")
    .trim()
    .notEmpty()
    .withMessage("Логин обязателен")
    .isLength({ min: 3, max: 55 })
    .withMessage("Логин должен быть от 3 до 55 символов"),

  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("Имя обязательно")
    .isLength({ max: 55 })
    .withMessage("Имя слишком длинное"),

  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("Фамилия обязательна")
    .isLength({ max: 55 })
    .withMessage("Фамилия слишком длинная"),

  body("patronymic")
    .optional()
    .isLength({ max: 55 })
    .withMessage("Отчество слишком длинное"),

  body("bio")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Биография слишком длинная"),

  body("email")
    .notEmpty()
    .withMessage("Email обязателен")
    .isEmail()
    .withMessage("Некорректный email"),

  body("password")
    .notEmpty()
    .withMessage("Пароль обязателен")
    .isLength({ min: 8 })
    .withMessage("Пароль должен быть минимум 8 символов")
    .matches(/[A-Z]/)
    .withMessage("Пароль должен содержать хотя бы одну заглавную букву")
    .matches(/[0-9]/)
    .withMessage("Пароль должен содержать хотя бы одну цифру")
    .matches(/[@$!%*?&]/)
    .withMessage("Пароль должен содержать хотя бы один спецсимвол"),

  body("profile_picture_url")
    .optional()
    .isURL()
    .withMessage("Аватар должен быть корректным URL"),

  body("registration_date")
    .optional()
    .isISO8601()
    .withMessage("Дата должна быть в формате YYYY-MM-DD"),
];

module.exports = userValidator;
