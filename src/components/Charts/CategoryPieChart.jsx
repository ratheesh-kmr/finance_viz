// components/charts/CategoryPieChart.jsx
import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57'];

const CategoryPieChart = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios.get('https://finance-viz-backend.onrender.com/api/transactions').then(res => {
      const grouped = res.data.reduce((acc, t) => {
        if (t.type === 'expense') {
          acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        }
        return acc;
      }, {});

      const formatted = Object.entries(grouped).map(([key, value]) => ({
        name: key,
        value
      }));

      setCategoryData(formatted);
    });
  }, []);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.7)', // More transparent black background
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '14px',
            transition: 'opacity 0.3s ease-in-out',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', // Subtle shadow for better visibility
          }}
        >
          <p style={{ margin: 0 }}>Amount: ₹{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      {categoryData.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'gray' }}>No expense data available.</p>
      ) : (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
           <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryPieChart;
