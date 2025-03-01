const express = require('express');
const GroupController = require('../controllers/group.controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/', authMiddleware, GroupController.createGroup);
router.post('/:groupId/members', authMiddleware, GroupController.addGroupMember);
router.get('/', authMiddleware, GroupController.listGroups);

module.exports = router;
