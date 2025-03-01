const express = require('express');
const ContactController = require('../controllers/contact.controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/', authMiddleware, ContactController.addContact);
router.get('/', authMiddleware, ContactController.listContacts);

module.exports = router;