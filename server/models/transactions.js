let mongoose = require('mongoose');

// create a model class
let Transaction = mongoose.Schema({

  category: String,
  subcategory: String,
  quantity: Number,
  amount: Number,
  description: String,
  status: {
    type: String,
    enum: ['Received','Payment']
  },
  date: {
    type: Date
  },
  resolutionMessage: String
}, {
  collection: "transactions"
});

module.exports = mongoose.model('Transaction', Transaction);
