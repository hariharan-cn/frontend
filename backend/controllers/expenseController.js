const Expense = require('../models/Expense');
const TeamMember = require('../models/TeamMember');

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find().populate('paidBy participants');
  res.json(expenses);
};

exports.addExpense = async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.status(201).json(expense);
};

exports.deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

exports.getMonthlySummary = async (req, res) => {
  const month = parseInt(req.params.month, 10);
  const start = new Date(new Date().getFullYear(), month, 1);
  const end = new Date(new Date().getFullYear(), month + 1, 1);

  const expenses = await Expense.find({ date: { $gte: start, $lt: end } })
    .populate('paidBy participants');

  const summary = {};

  for (const expense of expenses) {
    const share = expense.amount / expense.participants.length;

    // Add paid amount
    const payer = expense.paidBy.name;
    if (!summary[payer]) summary[payer] = { paid: 0, share: 0 };
    summary[payer].paid += expense.amount;

    // Add share for each participant
    for (const p of expense.participants) {
      const name = p.name;
      if (!summary[name]) summary[name] = { paid: 0, share: 0 };
      summary[name].share += share;
    }
  }

  res.json(summary);
};
