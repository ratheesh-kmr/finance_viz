// Sidebar.jsx
import React from 'react';
import AnalyticsPage from './Analytics/Analytics';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="app-logo">
          <i className="icon-wallet"></i>
          <h1>FinanceViz</h1>
          <span>Web app</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <a href="/" className="nav-item active">
          <i className="icon-home"></i>
          <span>Home</span>
        </a>
        <a href="/Analytics" className="nav-item">
          <i className="icon-chart"></i>
          <span>Analytics</span>
        </a>
        <a href="/" className="nav-item">
          <i className="icon-calculator"></i>
          <span>Budget</span>
        </a>
        <a href="/" className="nav-item">
          <i className="icon-bank"></i>
          <span>Accounts</span>
        </a>
        <a href="/" className="nav-item">
          <i className="icon-settings"></i>
          <span>Settings</span>
        </a>
      </nav>
      
      <div className="sidebar-footer">
        <div className="plan-info">
          <i className="icon-star"></i>
          <span>Developed By Ratheesh Kumar</span>
        </div>
        
        
      </div>
    </aside>
  );
};

export default Sidebar;
