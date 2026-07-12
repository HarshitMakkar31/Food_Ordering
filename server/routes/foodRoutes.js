const express = require('express');
const Food = require('../models/Food');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const foods = await Food.find().sort({ category: 1, name: 1 });
  res.json(foods);
});

router.get('/:id', async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) return res.status(404).json({ message: 'Food not found' });
  res.json(food);
});

// simple admin-only create, useful for extending the demo
router.post('/', protect, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  const { name, description, price, category, image } = req.body;
  const food = await Food.create({ name, description, price, category, image });
  res.status(201).json(food);
});

module.exports = router;
