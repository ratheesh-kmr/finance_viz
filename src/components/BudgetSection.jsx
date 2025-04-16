import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BudgetSection.css';

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

  const deleteBudget = async (id) => {
    await axios.delete(`http://localhost:5000/api/budgets/${id}`);
    fetchBudgets();
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className="budget-card">
      <div className="budget-header">
        <h3>Monthly Budgets</h3>
      </div>
      <form onSubmit={addBudget} className="budget-form">
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={newBudget.category}
            onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
          >
            <option>Food</option>
            <option>Utilities</option>
            <option>Travel</option>
            <option>Entertainment</option>
            <option>Others</option>
          </select>
        </div>

        <div className="form-group">
          <label>Budget Amount</label>
          <input
            name="budgetAmount"
            type="number"
            placeholder="Enter Amount"
            value={newBudget.budgetAmount}
            onChange={(e) => setNewBudget({ ...newBudget, budgetAmount: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Month</label>
          <input
            name="month"
            type="month"
            value={newBudget.month}
            onChange={(e) => setNewBudget({ ...newBudget, month: e.target.value })}
            required
          />
        </div>

        <button type="submit">Add Budget</button>
      </form>

      <ul className="budget-list">
        {budgets.length === 0 ? (
          <li className="empty-budget">No budgets added yet.</li>
        ) : (
          budgets.map((b) => (
            <li key={b._id} className="budget-item">
              <div className="budget-info">
                <span><strong>{b.category}</strong> - ₹{b.budgetAmount} ({b.month})</span>
              </div>
              <button className="delete-btn" onClick={() => deleteBudget(b._id)}>Remove</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BudgetSection;
