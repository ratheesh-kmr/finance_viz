import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import axios from 'axios';
import dayjs from 'dayjs';

const MonthlyTrendLineChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    axios.get('https://finance-viz-backend.onrender.com/api/transactions').then((res) => {
      const grouped = {};

      res.data.forEach((t) => {
        const month = dayjs(t.date).format('MMM YYYY');
        grouped[month] = (grouped[month] || 0) + t.amount;
      });

      const sorted = Object.entries(grouped)
        .map(([month, amount]) => ({ month, amount }))
        .sort((a, b) => dayjs(a.month).unix() - dayjs(b.month).unix());

      setMonthlyData(sorted);
    });
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '14px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          }}
        >
          <p style={{ margin: 0 }}>{`${label}: ₹${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          stroke="#aaa"
          tick={{ fontSize: 12 }}
          tickFormatter={(str) => dayjs(str).format('MMM YYYY')}
        />
        <YAxis stroke="#aaa" tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#82ca9d"
          strokeWidth={3}
          activeDot={{ r: 6 }}
          dot={{ r: 4 }}
          animationDuration={1000} // Smooth transition
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyTrendLineChart;