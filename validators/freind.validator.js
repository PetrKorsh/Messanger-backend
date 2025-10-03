const { query, validationResult } = require("express-validator");

const validateGetChatMessages = [
  query("userId").isInt().withMessage("Неверный ID пользователя"),
  query("friendId").isInt().withMessage("Неверный ID собеседника"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateGetChatMessages };
