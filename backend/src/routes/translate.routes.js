const express = require('express');
const TranslateController = require('../controllers/translate.controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/', authMiddleware, TranslateController.translateMessage);

module.exports = router;
