// models/Group.js
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    member_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    visitor_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    created_on: { type: Date, default: Date.now },
    modified_on: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Group', groupSchema);