const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new transaction
router.post('/', async (req, res) => {
  try {
    const { amount, date, description, category, type } = req.body;

    const transaction = new Transaction({
      amount,
      date,
      description,
      category,
      type: type || 'expense'  // fallback to 'expense' if type not given
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update transaction
router.put('/:id', async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE transaction
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
