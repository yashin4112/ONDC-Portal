// Model for Catalog Item
const mongoose = require('mongoose');

const catalogItemSchema = new mongoose.Schema({
  // sellerId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Seller',
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
  },
  name: String,
  description: String,
  categoryId: String,
  sku: String,
  mrp: Number,
  unitOfMeasure: String,
  image: String,
});

module.exports = mongoose.model('CatalogItem', catalogItemSchema);
