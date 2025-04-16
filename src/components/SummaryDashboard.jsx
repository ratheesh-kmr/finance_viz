import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SummaryDashboard.css';

const SummaryDashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({
    Food: 0,
    Travel: 0,
    Utilities: 0,
    Entertainment: 0,
    Others: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://finance-viz-backend.onrender.com/api/transactions');
        const transactions = response.data;

        let income = 0;
        let expenses = 0;
        let categories = {
          Food: 0,
          Travel: 0,
          Utilities: 0,
          Entertainment: 0,
          Others: 0,
        };

        transactions.forEach((transaction) => {
          const amt = Number(transaction.amount);
          if (transaction.type === 'income') {
            income += amt;
          } else if (transaction.type === 'expense') {
            expenses += amt;
            if (categories[transaction.category]) {
              categories[transaction.category] += amt;
            } else {
              categories[transaction.category] = amt;
            }
          }
        });

        setTotalIncome(income);
        setTotalExpenses(expenses);
        setCategoryTotals(categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const availableBalance = totalIncome - totalExpenses;

  return (
    <div className="summary-dashboard">
      <div className="metric-cards">
        <div className="metric-card">
          <div className="card-header">
            <h3>Total Income</h3>
            <span className="trend positive">+7%</span>
          </div>
          <div className="card-value">₹{Number(totalIncome).toLocaleString()}</div>
          <div className="card-subtitle">Last 30 days</div>
        </div>

        <div className="metric-card">
          <div className="card-header">
            <h3>Total Expenses</h3>
            <span className="trend negative">-5%</span>
          </div>
          <div className="card-value">₹{Number(totalExpenses).toLocaleString()}</div>
          <div className="card-subtitle">Last 30 days</div>
        </div>

        <div className="metric-card">
          <div className="card-header">
            <h3>Available Balance</h3>
          </div>
          <div
            className={`card-value ${availableBalance >= 0 ? 'positive' : 'negative'}`}
          >
            ₹{Number(availableBalance).toLocaleString()}
          </div>
          <div className="card-subtitle">As of now</div>
        </div>

        {Object.entries(categoryTotals).map(([category, amount]) => (
          <div key={category} className="metric-card">
            <div className="card-header">
              <h3>{category}</h3>
            </div>
            <div className="card-value">₹{Number(amount).toLocaleString()}</div>
            <div className="card-subtitle">Last 30 days</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryDashboard;
