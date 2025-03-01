const express = require('express');
const RoomController = require('../controllers/room.controller');

const router = express.Router();

router.post('/', RoomController.createRoom);
router.get('/', RoomController.getAllRooms);
router.get('/:id', RoomController.getRoom);

module.exports = router;
