// db.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://hackathon:WA97ARDbuS7eUYgK@cluster0.juuxbmb.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export the Mongoose connection
module.exports = mongoose.connection;
