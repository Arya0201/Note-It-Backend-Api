const Expense = require("../models/Expense");
const Group =require("./../models/Group");
const User = require('../models/User');


// Assuming you have a function like this in your controllers
addExpense = async (req, res) => {
    const { title, description, date, amount, groupId } = req.body;
    const createdUser = req.user.id; // Extract the user ID from the JWT token

    try {
        // Find the group
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if the user is an admin or member of the group
        const isAdmin = group.admin_id.toString() === createdUser;
        const isMember = group.member_id.includes(createdUser);

        if (!isAdmin && !isMember) {
            return res.status(403).json({ error: 'You do not have permission to add expenses to this group' });
        }

        // Create a new expense
        const expense = new Expense({
            title,
            description,
            date,
            amount,
            group_id: groupId,
            createdUser
        });

        await expense.save();
        res.status(201).json({ message: 'Expense added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

getExpensesByGroup = async (req, res) => {
    const { groupId } = req.params;

    try {
        // Find all expenses associated with the specified group ID and populate the 'createdUser' field
        const expenses = await Expense.find({ group_id: groupId })
            .populate('createdUser', 'username'); // Populate the 'createdUser' field with the 'username' field from the User model

        if (!expenses || expenses.length === 0) {
            return res.status(404).json({ message: 'No expenses found for this group' });
        }

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


deleteExpense = async (req, res) => {
    const { expenseId } = req.params;
    const userId = req.user.id; // Extract the user ID from the JWT token

    try {
        // Find the expense to be deleted
        const expense = await Expense.findById(expenseId);

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        // Find the group associated with the expense
        const group = await Group.findById(expense.group_id);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if the user is an admin of the group
        if (group.admin_id.toString() !== userId) {
            return res.status(403).json({ error: 'You do not have permission to delete this expense' });
        }

        // Delete the expense
        await Expense.findByIdAndDelete(expenseId);

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports={addExpense , getExpensesByGroup, deleteExpense}