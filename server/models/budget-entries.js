let mongoose = require('mongoose');

let BudgetEntries = mongoose.Schema({
  budgetId: mongoose.ObjectId,
  categoryId: mongoose.ObjectId,
  assigned: Number,
}, {
  collection: "budget_entries"
});

module.exports = mongoose.model('BudgetEntries', BudgetEntries);
