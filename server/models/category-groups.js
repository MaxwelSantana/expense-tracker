let mongoose = require('mongoose');

let CategoryGroups = mongoose.Schema({
  name: String,
  userId: mongoose.ObjectId,
}, {
  collection: "category_groups"
});

module.exports = mongoose.model('CategoryGroups', CategoryGroups);
