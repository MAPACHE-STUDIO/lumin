const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

const UserController = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }
      
      // Hash de la contraseña (refactorizar)
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      
      const user = await User.create({
        username,
        email,
        password: hashedPassword
      });
      
      // Generamos el token JWT (refactorizar)
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      const formatedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      }
      res.status(201).json({
        user: formatedUser,
        token
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidad' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generamos el token JWT (refactorizar)
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      const formatedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      }
      res.json({
        user: formatedUser,
        token
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      const { password: _, ...userWithoutPassword } = user.toJSON();
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateUser (req, res) {
    try {
      const { userId, username, email, password, newPassword, profileImage, active, status } = req.body; // Datos a actualizar
  
      // Buscar el usuario por ID
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // verificar password
      if (password && newPassword) {
          const isMatch = await bcrypt.compare(password, user.password); // Verificación con bcrypt
          if (!isMatch) {
              return res.status(400).json({ message: "La contraseña actual es incorrecta" });
          }

          if (password === newPassword) {
              return res.status(400).json({ message: "La nueva contraseña no puede ser igual a la anterior" });
          }

          // Encriptar la nueva contraseña antes de guardarla
          const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
          user.password = hashedPassword;
      }
  
      // Actualizar el usuario con los datos proporcionados
      await user.update({
        username: username ?? user.username,
        email: email ?? user.email,
        profileImage: profileImage ?? user.profileImage,
        active: active ?? user.active,
        // status: status ?? user.status,
      });

      await user.save();
  
      return res.json({ message: 'Usuario actualizado con éxito', user });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  },
  
  async deleteUser (req, res) {
    try {
      const { id } = req.params; // ID del usuario a eliminar
  
      // Buscar el usuario por ID
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Eliminar el usuario
      await user.destroy();
  
      return res.json({ message: 'Usuario eliminado con éxito' });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
  }
};

module.exports = UserController;