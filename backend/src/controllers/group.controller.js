// controllers/groupController.js
const { Group, GroupMember } = require('../models');

const GroupController = {
    async createGroup (req, res) {
        try {
        const { name } = req.body;
        const ownerId = req.user.id; // Asignado por authMiddleware
        const group = await Group.create({ name, ownerId });
        res.status(201).json({ message: 'Group created', group });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    },
    async addGroupMember (req, res) {
        try {
        const { groupId } = req.params;
        const { userId } = req.body;
        const groupMember = await GroupMember.create({ groupId, userId });
        res.status(201).json({ message: 'Member added to group', groupMember });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    },
    async listGroups (req, res) {
        try {
        const userId = req.user.id; // Asignado por authMiddleware
        const groups = await Group.findAll({
            include: [{ model: GroupMember, where: { userId }, required: true }],
        });
        res.status(200).json({ groups });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
};

module.exports = GroupController;
