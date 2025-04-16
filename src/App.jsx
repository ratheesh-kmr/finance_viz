// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SummaryDashboard from './components/SummaryDashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import BudgetSection from './components/BudgetSection';
import AnalyticsPage from './components/Analytics/Analytics';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        {/* Toggle Button */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        {/* Responsive Sidebar */}
        <div className={`sidebar-wrapper ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
          <Sidebar />
        </div>

        <main className="main-content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
          <Routes>
          <Route
              path="/"
                element={
                <div className="content-wrapper home-dashboard">
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
            <Route path="/BudgetSection" element={<BudgetSection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
