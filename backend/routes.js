// routes/bucketRoutes.js
const express = require('express');
const router = express.Router();
const Bucket = require('../models/Bucket');

// Route for creating a new bucket
router.post('/', async (req, res) => {
  try {
    const { bucketName, region, date } = req.body;
    const bucket = new Bucket({ bucketName, region, date });
    await bucket.save();
    res.status(201).json(bucket);
  } catch (error) {
    console.error('Error creating bucket:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for fetching all buckets
router.get('/', async (req, res) => {
  try {
    const buckets = await Bucket.find();
    res.json(buckets);
  } catch (error) {
    console.error('Error fetching buckets:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for updating a bucket
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { bucketName, region, date } = req.body;
    const updatedBucket = await Bucket.findByIdAndUpdate(id, { bucketName, region, date }, { new: true });
    res.json(updatedBucket);
  } catch (error) {
    console.error('Error updating bucket:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for deleting a bucket
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Bucket.findByIdAndDelete(id);
    res.json({ message: 'Bucket deleted successfully' });
  } catch (error) {
    console.error('Error deleting bucket:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
