const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, default: 'Other' },
  image: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
