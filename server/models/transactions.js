let mongoose = require('mongoose');

// create a model class
let Transaction = mongoose.Schema({
  Id: number,
  Category: String,
  Subcateory: String,
  Quantity: number,
  Amount: number,
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
