// Model for Catalog Item
const mongoose = require('mongoose');

const catalogItemSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: String,
  description: String,
  categoryId: String,
  sku: Number,
  mrp: Number,
  unitOfMeasure: String,
  image: String,
});

module.exports = mongoose.model('CatalogItem', catalogItemSchema);
