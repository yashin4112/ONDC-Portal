// Main server file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
const sellerRoutes = require('./routes/sellerRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
app.use('/api/sellers', sellerRoutes);
app.use('/api/catalog', catalogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
