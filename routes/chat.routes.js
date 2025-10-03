const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/chat.controller");
const { validateGetUserChats } = require("../validators/chat.validator");
const { validateGetChatMessages } = require("../validators/freind.validator");
const validate = require("../middleware/validate");

router.get(
  "/chat",
  validateGetUserChats,
  validate,
  ChatController.getUserChats
);
router.get(
  "/messages",
  validateGetChatMessages,
  validate,
  ChatController.getChatMessages
);

module.exports = router;
