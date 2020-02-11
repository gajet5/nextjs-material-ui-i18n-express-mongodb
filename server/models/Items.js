const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Items = new Schema({
  itemName: {
    type: String
  }
});

module.exports = mongoose.model('Items', Items);
