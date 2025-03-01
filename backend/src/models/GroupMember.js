module.exports = (sequelize, DataTypes) => {
    const GroupMember = sequelize.define('GroupMember', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      groupId: { type: DataTypes.UUID, allowNull: false },
      userId: { type: DataTypes.UUID, allowNull: false },
    });
    GroupMember.associate = (models) => {
      GroupMember.belongsTo(models.Group, { foreignKey: 'groupId' });
      GroupMember.belongsTo(models.User, { foreignKey: 'userId' });
    };
    return GroupMember;
  };