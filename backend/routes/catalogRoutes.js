const express = require('express');
const router = express.Router();
const CatalogItem = require('../models/CatalogItem');
 
const User = require('../models/User'); // Import the User model

router.post('/', async (req, res) => {
  try {
    const { sellerEmail, name, description, sku, mrp, unitOfMeasure, image } = req.body;

    // Find the seller by email
    const seller = await User.findOne({ email: sellerEmail, type: 'seller' });
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    // Create the catalog item
    const catalogItem = new CatalogItem({
      sellerId: seller._id, // Use seller's ObjectId
      name,
      description,
      sku,
      mrp,
      unitOfMeasure,
      image,
    });

    await catalogItem.save();
    res.status(201).json({ message: 'Catalog item created successfully' });
  } catch (error) {
    console.error('Error creating catalog item:', error);
    res.status(500).json({ message: 'Error creating catalog item' });
  }
});

module.exports = router;


router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const searchResults = await CatalogItem.find({ $text: { $search: query } });
    res.json(searchResults);
  } catch (error) {
    console.error('Error searching catalog items:', error);
    res.status(500).json({ message: 'Error searching catalog items' });
  }
});

module.exports = router;
