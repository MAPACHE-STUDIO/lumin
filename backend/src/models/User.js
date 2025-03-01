module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImage: {
      type: DataTypes.STRING,
      defaultValue: 'https://cdn-icons-png.flaticon.com/512/7276/7276847.png',
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });

  User.associate = (models) => {
    User.belongsToMany(models.User, {
      as: 'Contacts', // Este es el alias que usaremos para acceder a los contactos de un usuario
      through: 'UserContacts', // Esta es la tabla intermedia que manejará la relación
      foreignKey: 'userId',
      otherKey: 'contactId',
      timestamps: false, // Sin timestamps en la tabla intermedia
    });
  };
  
  return User;
};

