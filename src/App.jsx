import React from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import BudgetSection from './components/BudgetSection';
import SummaryDashboard from './components/SummaryDashboard';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Personal Finance Visualizer</h1>
      <SummaryDashboard />
      <TransactionForm />
      <TransactionList />
      <BudgetSection />
    </div>
  );
}

export default App;