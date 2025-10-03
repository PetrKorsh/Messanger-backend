const { param, validationResult } = require("express-validator");

const validateGetUserChats = [
  param("userId").isInt().withMessage("Неверный ID пользователя"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateGetUserChats };
