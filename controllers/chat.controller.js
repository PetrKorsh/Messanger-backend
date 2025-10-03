const Message = require("../model/Message");
const User = require("../model/User");
const { Op } = require("sequelize");

class ChatController {
  async getUserChats(req, res) {
    try {
      const userId = req.query.userId;

      const messages = Message.findAll({
        where: {
          [Op.or]: [{ sender_id: user_id }, { receiver_id: user_id }],
        },
        include: [
          {
            model: User,
            as: "Sender",
            attributes: ["user_id", "login", "profile_picture_url"],
          },
          {
            model: User,
            as: "Receiver",
            attributes: ["user_id", "login", "profile_picture_url"],
          },
        ],
        order: [["sent_at", "DESC"]],
      });

      const chatsUnique = new Map();

      messages.forEach((msg) => {
        const otherUser =
          msg.sender_id.toString() === userId.toString()
            ? msg.Receiver
            : msg.Sender;

        if (!chatsMap.has(otherUser.user_id)) {
          chatsMap.set(otherUser.user_id, {
            user: otherUser,
            lastMessage: msg.content,
            lastMessageTime: msg.sent_at,
          });
        }
      });
      const chats = Array.from(chatsUnique.values());

      res.json({ success: true, chats });
    } catch (error) {
      console.error("Ошибка получения чатов:", error);
      res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
  }

  async getChatMessages(req, res) {
    try {
      const { userId, friendId } = req.query;

      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { sender_id: userId, receiver_id: friendId },
            { sender_id: friendId, receiver_id: userId },
          ],
        },
        include: [
          { model: User, as: "Sender", attributes: ["user_id", "login"] },
          { model: User, as: "Receiver", attributes: ["user_id", "login"] },
        ],
        order: [["sent_at", "ASC"]], // по времени
      });

      res.json({ success: true, messages });
    } catch (error) {
      console.error("Ошибка получения сообщений:", error);
      res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
  }
}

module.exports = new ChatController();
