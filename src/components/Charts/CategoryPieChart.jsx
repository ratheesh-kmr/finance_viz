// components/charts/CategoryPieChart.jsx
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57'];

const CategoryPieChart = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions').then(res => {
      const grouped = res.data.reduce((acc, t) => {
        if (t.amount < 0) {
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

  return (
    <ResponsiveContainer width="100%" height={300}>
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
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;
