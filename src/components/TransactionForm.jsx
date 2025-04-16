import React, { useState } from 'react';
import axios from 'axios';
import './TransactionForm.css';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    category: 'Others',
    type: 'expense' // new field to indicate income/expense
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://finance-viz-backend.onrender.com/api/budgets', formData);
    setFormData({ amount: '', date: '', description: '', category: 'Others', type: 'expense' });
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form card">
      <h3>Add Transaction</h3>
      <div className="input-group">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Food</option>
          <option>Utilities</option>
          <option>Travel</option>
          <option>Entertainment</option>
          <option>Others</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">Add</button>
    </form>
  );
};

export default TransactionForm;