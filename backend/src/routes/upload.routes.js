
const express = require('express');
const upload = require('../config/multer')
const UploadController = require('../controllers/upload.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/',authMiddleware, upload.single('image'), UploadController.uploadImage);

module.exports = router;