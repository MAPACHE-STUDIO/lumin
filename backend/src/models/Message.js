module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Message.associate = (models) => {
    // Relación con el remitente (sender)
    Message.belongsTo(models.User, {
      foreignKey: 'senderId',
      as: 'sender',
      onDelete: 'CASCADE',
    });

    // Relación con el receptor (receiver)
    Message.belongsTo(models.User, {
      foreignKey: 'receiverId',
      as: 'receiver',
      onDelete: 'CASCADE',
    });

    // Relación con la conversación
    Message.belongsTo(models.Conversation, {
      foreignKey: 'conversationId',
      as: 'conversation',
      onDelete: 'CASCADE',
    });
  };

  return Message;
};
