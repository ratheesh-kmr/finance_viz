import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await axios.get('http://localhost:5000/api/transactions');
    setTransactions(res.data);
  };

  const deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="card">
      <h3>Transactions</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t._id}>
            ₹{t.amount} - {t.description} ({new Date(t.date).toLocaleDateString()}) - {t.category}
            <button onClick={() => deleteTransaction(t._id)}> Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;