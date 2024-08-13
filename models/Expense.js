// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add this line
    created_on: { type: Date, default: Date.now },
    modified_on: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Expense', expenseSchema);
