// controllers/groupController.js
const Group = require('../models/Group');
const Expense = require('../models/Expense');
const { deleteModel } = require('mongoose');

createGroup = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;
    try {
        const group = new Group({ name, admin_id: userId });
        await group.save();
        res.status(201).json({ message: 'Group created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

getGroups = async (req, res) => {
    const userId = req.user.id; // Extract the user ID from the authenticated user's token

    try {
        // Find all groups where the user is either an admin, a member, or a visitor
        const groups = await Group.find({
            $or: [
                { admin_id: userId },
                { member_ids: userId },
                { visitor_ids: userId }
            ]
        });

        if (groups.length === 0) {
            return res.status(404).json({ message: 'No groups found for this user' });
        }

        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


addMember = async (req, res) => {
    const { groupId, memberId, role } = req.body;
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ error: 'Group not found' });

        if (role === 'member') {
            group.member_ids.push(memberId);
        } else if (role === 'visitor') {
            group.visitor_ids.push(memberId);
        }

        await group.save();
        res.status(200).json({ message: 'Member added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

removeMember = async (req, res) => {
    const { groupId, userIdToRemove } = req.body;
    const userId = req.user.id; // Extract the admin's user ID from the authenticated user's token

    try {
        // Find the group
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if the requesting user is the admin of the group
        if (group.admin_id.toString() !== userId) {
            return res.status(403).json({ message: 'You do not have permission to remove members from this group' });
        }

        // Remove the user from the group's member or visitor lists
        group.member_ids = group.member_ids.filter(id => id.toString() !== userIdToRemove);
        group.visitor_ids = group.visitor_ids.filter(id => id.toString() !== userIdToRemove);

        await group.save();

        res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


deleteGroup = async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user.id; // Extract the admin's user ID from the authenticated user's token

    try {
        // Find the group
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if the requesting user is the admin of the group
        if (group.admin_id.toString() !== userId) {
            return res.status(403).json({ message: 'You do not have permission to delete this group' });
        }

        // Delete the group
        await Group.findByIdAndDelete(groupId);

        // Optionally, delete all expenses associated with this group
        await Expense.deleteMany({ group_id: groupId });

        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createGroup, addMember ,getGroups ,removeMember,deleteGroup}