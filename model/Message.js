const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const User = require("./User");

const Message = sequelize.define(
  "Message",
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // имя таблицы
        key: "user_id",
      },
      onDelete: "CASCADE", // если удалить юзера — удаляются сообщения
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true, // нельзя пустое сообщение
      },
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "sent", // варианты: sent, delivered, read
    },
    sent_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "messages",
    timestamps: false, // не добавлять createdAt/updatedAt
  }
);

// связи между таблицами
Message.belongsTo(User, { foreignKey: "sender_id", as: "Sender" });
Message.belongsTo(User, { foreignKey: "receiver_id", as: "Receiver" });

module.exports = Message;
