const express = require('express');
const router = express.Router();
const {
    addExpense,
    deleteExpense,
    getExpensesByGroup
} = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");
const { route } = require('./groupRoute');



router.post("/expenses/add",authMiddleware,addExpense);
router.delete("/expenses/:expenseId",authMiddleware,deleteExpense);


module.exports = router;
