import React from 'react';
import Sidebar from './Sidebar';
import SummaryDashboard from './SummaryDashboard';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

const AppLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className="content-wrapper">
          <div className="breadcrumb">
            <span>Dashboard</span> &gt; <span>Home</span>
          </div>
          <h1 className="page-title">Overview</h1>

          <SummaryDashboard />

          <div className="charts-container">
            <div className="chart-card large">
              <h2>Spending Breakdown</h2>
              {/* Spending chart component */}
            </div>
            <div className="chart-card large">
              <h2>Income vs Expenses</h2>
              {/* Income/expense chart component */}
            </div>
          </div>

          <div className="form-section">
            <h2>Add New Transaction</h2>
            <TransactionForm />
          </div>

          <TransactionList />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
