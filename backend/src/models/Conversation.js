module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('Conversation', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      conversationName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      lastMessage: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      isGroup: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      unreadCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      isFavorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isSilenced: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    });
  
    Conversation.associate = (models) => {
        // Relación n:n con la tabla User a través de UserConversation
        Conversation.belongsToMany(models.User, {
        through: 'UserConversation', // Nombre de la tabla intermedia
        foreignKey: 'conversationId', // Clave foránea en la tabla intermedia
        otherKey: 'userId', // Otra clave foránea
        });

        Conversation.hasMany(models.Message, {
            foreignKey: 'conversationId', // Clave foránea en el modelo Message
            as: 'messages',
        });
    };

    return Conversation;
  };
  
  