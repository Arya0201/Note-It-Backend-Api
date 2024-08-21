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
router.post('/create', authMiddleware, createGroup);
router.get('/groupList', authMiddleware, getGroups);
router.put('/set-group-name',authMiddleware,setGroupName);
router.post('/add-member', authMiddleware, addMember);
router.put('/remove-member', authMiddleware, removeMember);
router.delete('/:groupId', authMiddleware, deleteGroup);

// Export the router to be used in other parts of the application
module.exports = router;
