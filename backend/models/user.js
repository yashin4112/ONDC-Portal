// models/Bucket.js
const mongoose = require('mongoose');

// Define Bucket schema
const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    mobile_number: { type: String, default: null },
    password: { type: String },
    token: { type: String },
    address: { type: String },
    pincode: { type: String },
    type: { type: String, default: 'user' },
});


module.exports = mongoose.model('User', userSchema);