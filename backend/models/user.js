// models/Bucket.js
const mongoose = require('mongoose');

// Define Bucket schema
const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    mobile_number: { type: String, default: null },
    department: { type: String, default: null },
    password: { type: String },
    token: { type: String },
    bucket_location: {type: String, default: null, unique: true},
    region: {type: String},
    join_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('User', userSchema);