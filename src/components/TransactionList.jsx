import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransactionList.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    description: '',
    category: '',
    date: '',
    amount: '',
    type: 'expense',
  });
  const [showModal, setShowModal] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);  // New state for handling the "View All" button

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

  const openEditModal = (transaction) => {
    setEditingId(transaction._id);
    setEditForm({
      description: transaction.description,
      category: transaction.category,
      date: transaction.date.slice(0, 10),
      amount: transaction.amount,
      type: transaction.type,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setEditForm({});
  };

  const updateTransaction = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/transactions/${editingId}`, editForm);
      closeModal();
      fetchTransactions();
    } catch (err) {
      console.error('Error updating transaction:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="section-container">
      <div className="section-header">
        <h2>Recent Transactions</h2>
        <button
          className="view-all-btn"
          onClick={() => setShowAllTransactions(!showAllTransactions)}  // Toggle the view
        >
          {showAllTransactions ? 'Show Less' : 'View All'}
        </button>
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
            <div>Actions</div>
          </div>

          {/* Display either the first 4 transactions or all transactions based on `showAllTransactions` */}
          {(showAllTransactions ? transactions : transactions.slice(0, 4)).map((t) => (
            <div
              key={t._id}
              className="transaction-item"
              onClick={() => openEditModal(t)}
              style={{ cursor: 'pointer' }}
            >
              <div className="transaction-info">
                <span className="desc">{t.description}</span>
              </div>
              <div className="transaction-category">{t.category}</div>
              <div className="transaction-date">{new Date(t.date).toLocaleDateString()}</div>
              <div className={`transaction-amount ${t.type === 'income' ? 'income' : 'expense'}`}>
                {t.type === 'income' ? '+' : '-'}₹{Number(t.amount).toLocaleString()}
              </div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent popup from opening
                  deleteTransaction(t._id);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* === Modal === */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Transaction</h3>
            <form onSubmit={updateTransaction} className="modal-form">
              <input
                type="text"
                placeholder="Description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                required
              />
              <input
                type="date"
                value={editForm.date}
                onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Amount"
                value={editForm.amount}
                onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                required
              />
              <select
                value={editForm.type}
                onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <div className="modal-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
