import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SummaryDashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({ Food: 0, Travel: 0, Utilities: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transactions'); // replace with your API endpoint
        const transactions = response.data;

        // Calculate total expenses and category totals
        let total = 0;
        let categories = { Food: 0, Travel: 0, Utilities: 0, Entertainment: 0, Others: 0 };

        transactions.forEach((transaction) => {
          total += transaction.amount;
          if (categories[transaction.category]) {
            categories[transaction.category] += transaction.amount;
          } else {
            categories[transaction.category] = transaction.amount;
          }
        });

        setTotalExpenses(total);
        setCategoryTotals(categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="card total-expenses">
        <h3>Total Expenses</h3>
        <p>₹{Number(totalExpenses).toLocaleString()}</p>
      </div>

      {Object.entries(categoryTotals).map(([category, amount]) => (
        <div key={category} className="card">
          <h3>{category}</h3>
          <p>₹{Number(amount).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryDashboard;
