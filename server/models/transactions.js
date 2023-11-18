let mongoose = require('mongoose');

// create a model class
let Transaction = mongoose.Schema({
  Id: Number,
  Category: String,
  Subcategory: String,
  Quantity: Number,
  Amount: Number,
  Description: String,
  Status: {
    type: String,
    enum: ['Received','Payment']
  },
  Date: Date,
  ResolutionMessage: String
}, {
  collection: "transactions"
});

module.exports = mongoose.model('Transaction', Transaction);
