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
    <div className="section-container">
      <div className="section-header">
        <h2>Recent Transactions</h2>
        <button className="view-all-btn">View All</button>
      </div>

      {transactions.length === 0 ? (
        <p className="empty-message">No transactions yet.</p>
      ) : (
        <div className="transaction-table">
          <div className="table-header">
            <div>Description</div>
            <div>Category</div>
            <div>Date</div>
            <div>Amount</div>
            <div></div>
          </div>
          {transactions.map((t) => (
            <div key={t._id} className="transaction-item">
              <div className="transaction-info">
                <div className="transaction-details">
                  <span className="desc">{t.description}</span>
                </div>
              </div>
              <div className="transaction-category">{t.category}</div>
              <div className="transaction-date">{new Date(t.date).toLocaleDateString()}</div>
              <div
                className={`transaction-amount ${t.type === 'income' ? 'income' : 'expense'}`}
              >
                {t.type === 'income' ? '+' : '-'}₹{Number(t.amount).toLocaleString()}
              </div>
              <button className="delete-btn" onClick={() => deleteTransaction(t._id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
