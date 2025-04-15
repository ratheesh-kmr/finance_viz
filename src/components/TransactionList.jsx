import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransactionList.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="transaction-card">
      <h3 className="transaction-title">Transactions</h3>
      {transactions.length === 0 ? (
        <p className="transaction-empty">No transactions yet.</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((t) => (
            <li key={t._id} className="transaction-item">
              <div className="transaction-details">
                <span className="amount">₹{Number(t.amount).toLocaleString()}</span>
                <span className="desc">{t.description}</span>
                <span className="date">{new Date(t.date).toLocaleDateString()}</span>
                <span className="category">({t.category})</span>
              </div>
              <button className="delete-btn" onClick={() => deleteTransaction(t._id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;