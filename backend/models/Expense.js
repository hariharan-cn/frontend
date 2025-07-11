const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember' }]
});

module.exports = mongoose.model('Expense', ExpenseSchema);
