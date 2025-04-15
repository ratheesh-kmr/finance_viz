// components/charts/MonthlyTrendLineChart.jsx
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import dayjs from 'dayjs';

const MonthlyTrendLineChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions').then(res => {
      const grouped = {};

      res.data.forEach(t => {
        const month = dayjs(t.date).format('MMM YYYY');
        grouped[month] = (grouped[month] || 0) + t.amount;
      });

      const sorted = Object.entries(grouped)
        .map(([month, amount]) => ({ month, amount }))
        .sort((a, b) => dayjs(a.month).unix() - dayjs(b.month).unix());

      setMonthlyData(sorted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyTrendLineChart;
