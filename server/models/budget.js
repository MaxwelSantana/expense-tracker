let mongoose = require('mongoose');

let Budgets = mongoose.Schema({
  key: String,
  userId: mongoose.ObjectId,
}, {
  collection: "budgets"
});

module.exports = mongoose.model('Budgets', Budgets);
