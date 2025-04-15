import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
  const [formData, setFormData] = useState({ amount: '', date: '', description: '', category: 'Others' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/transactions', formData);
    setFormData({ amount: '', date: '', description: '', category: 'Others' });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Add Transaction</h3>
      <input name="amount" type="number" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option>Food</option>
        <option>Utilities</option>
        <option>Travel</option>
        <option>Entertainment</option>
        <option>Others</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default TransactionForm;
