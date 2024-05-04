// db.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://shivamd26:shivam@cluster0.ct66nen.mongodb.net/bucketData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export the Mongoose connection
module.exports = mongoose.connection;
