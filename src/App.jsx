// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SummaryDashboard from './components/SummaryDashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import BudgetSection from './components/BudgetSection';
import AnalyticsPage from './components/Analytics/Analytics'; // <-- Import Analytics Page
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="content-wrapper">
                  <h1 className="app-title">Finance Viz</h1>
                  <SummaryDashboard />
                  <div className="form-and-list">
                    <TransactionForm />
                    <TransactionList />
                  </div>
                </div>
              }
            />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/BudgetSection" element={<BudgetSection/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
