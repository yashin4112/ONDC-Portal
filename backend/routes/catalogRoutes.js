const express = require('express');
const router = express.Router();
const CatalogItem = require('../models/CatalogItem');

router.post('/', async (req, res) => {
  try {
    const newItem = new CatalogItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating catalog item:', error);
    res.status(500).json({ message: 'Error creating catalog item' });
  }
});

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
