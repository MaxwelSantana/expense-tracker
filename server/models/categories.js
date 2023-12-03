let mongoose = require('mongoose');

let Categories = mongoose.Schema({
  categoryGroupId: mongoose.ObjectId,
  name: String,
  target: {
    type: {
      targetType: String,
      enum: ["NeededForSpending","SavingsBalance","MonthlySavingsBuilder","MonthlyDebtPayment"],
      amount: Number,
      frequency: {
        type: String,
        enum: ['Weekly', 'Monthly', 'Yearly']
      }
    }
  }
}, {
  collection: "categories"
});

module.exports = mongoose.model('Categories', Categories);
