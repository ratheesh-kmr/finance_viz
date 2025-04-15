import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bcd4', '#d32f2f'];

const CategoryPieChart = ({ data }) => {
  const total = data.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <div className="category-chart-container">
      <h2 className="chart-title">Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#1e1e2f', border: 'none' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend verticalAlign="bottom" wrapperStyle={{ color: '#fff' }} />
        </PieChart>
      </ResponsiveContainer>
      <p className="total-expense">Total: ₹{total.toLocaleString()}</p>
    </div>
  );
};

export default CategoryPieChart;
