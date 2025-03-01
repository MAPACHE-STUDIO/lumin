const { Room } = require('../models');
const RoomController = {
  async createRoom(req, res) {
    try {
      const room = await Room.create(req.body);
      res.status(201).json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getAllRooms(req, res) {
    try {
      const rooms = await Room.findAll();
      res.json(rooms);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getRoom(req, res) {
    try {
      const room = await Room.findByPk(req.params.id);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      res.json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
module.exports = RoomController;