// chat.service.js
const Message = require("../model/Message");
const onlineUsers = new Map(); // userId => socket.id

/**
 * Регистрируем пользователя в онлайн-списке
 * @param {string|number} userId
 * @param {string} socketId
 */
function registerUser(userId, socketId) {
  onlineUsers.set(userId, socketId);
}

/**
 * Удаляем пользователя из онлайн-списка при отключении
 * @param {string} socketId
 */
function disconnectUser(socketId) {
  for (const [userId, sId] of onlineUsers.entries()) {
    if (sId === socketId) {
      onlineUsers.delete(userId);
      break;
    }
  }
}

/**
 * Отправка сообщения
 * @param {Object} io - инстанс socket.io
 * @param {Object} data - { sender_id, receiver_id, content }
 */
async function sendMessage(io, data) {
  // Сохраняем сообщение в БД
  const newMessage = await Message.create({
    sender_id: data.sender_id,
    receiver_id: data.receiver_id,
    content: data.content,
  });

  // Отправляем получателю, если онлайн
  const receiverSocket = onlineUsers.get(data.receiver_id);
  if (receiverSocket) {
    io.to(receiverSocket).emit("receiveMessage", newMessage);
  }

  // Подтверждение отправителю
  const senderSocket = onlineUsers.get(data.sender_id);
  if (senderSocket) {
    io.to(senderSocket).emit("messageSent", newMessage);
  }

  return newMessage;
}

/**
 * Получаем историю сообщений между двумя пользователями
 * @param {number} userId
 * @param {number} friendId
 */
async function getMessages(userId, friendId) {
  const messages = await Message.findAll({
    where: {
      sender_id: [userId, friendId],
      receiver_id: [userId, friendId],
    },
    order: [["sent_at", "ASC"]],
  });
  return messages;
}

module.exports = {
  registerUser,
  disconnectUser,
  sendMessage,
  getMessages,
  onlineUsers,
};
