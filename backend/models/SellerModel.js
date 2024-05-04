// Model for Seller
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  address: String,
});

module.exports = mongoose.model('Seller', sellerSchema);
