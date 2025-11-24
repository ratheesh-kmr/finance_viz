// Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnalyticsPage from './Analytics/Analytics';

const Sidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
  
    return (
      <aside className="sidebar-content">
        <div className="sidebar-header">
          <div className="app-logo">
            <i className="icon-wallet"></i>
            <h1>FinanceViz</h1>
            <span>Web app</span>
          </div>
        </div>
  
        <nav className="sidebar-nav">
          <Link to="/" className={`nav-item ${currentPath === '/' ? 'active' : ''}`}>
            <i className="icon-home"></i>
            <span>Home</span>
          </Link>
  
          <Link to="/Analytics" className={`nav-item ${currentPath === '/Analytics' ? 'active' : ''}`}>
            <i className="icon-chart"></i>
            <span>Analytics</span>
          </Link>
  
          <Link to="/BudgetSection" className={`nav-item ${currentPath === '/BudgetSection' ? 'active' : ''}`}>
            <i className="icon-calculator"></i>
            <span>Budget</span>
          </Link>
  
          {/* <Link to="/Accounts" className={`nav-item ${currentPath === '/Accounts' ? 'active' : ''}`}>
            <i className="icon-bank"></i>
            <span>Accounts</span>
          </Link>
  
          <Link to="/Settings" className={`nav-item ${currentPath === '/Settings' ? 'active' : ''}`}>
            <i className="icon-settings"></i>
            <span>Settings</span>
          </Link> */}
        </nav>
  
        <div className="sidebar-footer">
          <div className="plan-info">
            <i className="icon-star"></i>
            <span>Your money, simplified.</span>
          </div>
        </div>
      </aside>
    );
  };
  
  export default Sidebar;
  