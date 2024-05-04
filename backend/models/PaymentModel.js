// Model for Catalog Item
const mongoose = require('mongoose');

const paymentItemSchema = new mongoose.Schema({
    card_number: String,
    card_holder: String,
    expiry_date: String,
    cvv: Number,
    balance: Number,
});

module.exports = mongoose.model('PaymentItem', paymentItemSchema);
