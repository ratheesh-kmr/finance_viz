// components/AnalyticsPage.jsx
import React from 'react';
import CategoryPieChart from '../Charts/CategoryPieChart';
import IncomeExpenseBarChart from '../Charts/IncomeExpenseBarChart';
import MonthlyTrendLineChart from '../Charts/MonthlyTrendLineChart';
import './Analytics.css';

const AnalyticsPage = () => {
    return (
        <div className="app-container">
            <main className="main-content">
                <div className="content-wrapper">
                    <div className="breadcrumb">
                        <span>Dashboard</span> &gt; <span>Analytics</span>
                    </div>
                    <h1 className="page-title">Analytics Overview</h1>

                    <div className="charts-grid">
                        <div className="chart-box">
                            <h2>Category-wise Spending</h2>
                            <CategoryPieChart />
                        </div>

                        <div className="chart-box">
                            <h2>Income vs Expenses</h2>
                            <IncomeExpenseBarChart />
                        </div>

                        <div className="chart-box">
                            <h2>Monthly Trends</h2>
                            <MonthlyTrendLineChart />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AnalyticsPage;
