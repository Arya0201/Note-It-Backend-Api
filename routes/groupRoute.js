// Import necessary modules
const express = require('express');
const router = express.Router();
const {
    createGroup,
    addMember,
    getGroups,
    removeMember,
    deleteGroup
} = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

// Group-related routes
router.post('/groups/create', authMiddleware, createGroup);
router.get('/groups', authMiddleware, getGroups);
router.post('/groups/add-member', authMiddleware, addMember);
router.put('/groups/remove-member', authMiddleware, removeMember);
router.delete('/groups/:groupId', authMiddleware, deleteGroup);

// Export the router to be used in other parts of the application
module.exports = router;
