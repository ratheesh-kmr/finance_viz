import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetSection = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ category: 'Food', budgetAmount: '', month: '2025-04' });

  const fetchBudgets = async () => {
    const res = await axios.get('http://localhost:5000/api/budgets');
    setBudgets(res.data);
  };

  const addBudget = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/budgets', newBudget);
    setNewBudget({ category: 'Food', budgetAmount: '', month: '2025-04' });
    fetchBudgets();
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className="card">
      <h3>Budgets</h3>
      <form onSubmit={addBudget}>
        <select name="category" value={newBudget.category} onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}>
          <option>Food</option>
          <option>Utilities</option>
          <option>Travel</option>
          <option>Entertainment</option>
          <option>Others</option>
        </select>
        <input
          name="budgetAmount"
          type="number"
          placeholder="Budget Amount"
          value={newBudget.budgetAmount}
          onChange={(e) => setNewBudget({ ...newBudget, budgetAmount: e.target.value })}
          required
        />
        <input
          name="month"
          type="month"
          value={newBudget.month}
          onChange={(e) => setNewBudget({ ...newBudget, month: e.target.value })}
          required
        />
        <button type="submit">Add Budget</button>
      </form>
      <ul>
        {budgets.map((b) => (
          <li key={b._id}>{b.category}: ₹{b.budgetAmount} ({b.month})</li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetSection;