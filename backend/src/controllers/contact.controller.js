// controllers/contactController.js
const { Contact, User } = require('../models');
 

const ContactController =  {
  async addContact ( req, res ) {
    try {
      const { email } = req.body;
      const userId = req.user.id; // Asignado por authMiddleware
      
      const user = await User.findByPk(userId);
      const contact = await User.findOne({ where: { email } });
      
      if (!user || !contact) {
        return res.status(404).json({ message: 'Contacto no encontrado' });
      }
      
      if (userId === contact.id) {
        return res.status(400).json({ message: "No puedes agregarte como contacto" });
      }
  
      await user.addContact(contact.id);
      res.status(201).json({ message: 'Contacto agregado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async listContacts ( req, res ) {
    try {
      const id = req.user.id; // Asignado por authMiddleware
      const contacts = await User.findAll({
        where: { id },
        include: [
          { 
            model: User,
            as: 'Contacts',
            attributes: ['id', 'username', 'email'] }],
            // through: { attributes: [] },
      });
      const { Contacts } = contacts[0];
      res.status(200).json({ Contacts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = ContactController;
