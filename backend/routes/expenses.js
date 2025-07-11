const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getExpenses);
router.post('/', expenseController.addExpense);
router.delete('/:id', expenseController.deleteExpense);
router.get('/summary/:month', expenseController.getMonthlySummary);

module.exports = router;
