// models/Group.js
module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
      name: {
        type: DataTypes.STRING,
        allowNull: false
    },
      ownerId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    });
    Group.associate = (models) => {
      Group.belongsTo(models.User, { foreignKey: 'ownerId' });
      Group.hasMany(models.Message, { foreignKey: 'groupId' });
    };
    return Group;
  };
  