const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const User = require("./User");
const Message = require("./Message");

const Chat = sequelize.define(
  "Chat",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    is_group: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true, // только для групп
    },
  },
  {
    tableName: "chats",
    timestamps: false,
  }
);

const ChatMember = sequelize.define(
  "ChatMember",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      references: { model: "chats", key: "chat_id" },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "user_id" },
    },
  },
  {
    tableName: "chat_members",
    timestamps: false,
  }
);

// связи
Chat.belongsToMany(User, {
  through: ChatMember,
  as: "Members",
  foreignKey: "chat_id",
});
User.belongsToMany(Chat, {
  through: ChatMember,
  as: "Chats",
  foreignKey: "user_id",
});

Message.belongsTo(Chat, { foreignKey: "chat_id" });
Chat.hasMany(Message, { foreignKey: "chat_id" });

module.exports = Chat;
