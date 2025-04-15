// components/charts/IncomeExpenseBarChart.jsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const IncomeExpenseBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions').then(res => {
      let income = 0;
      let expense = 0;

      res.data.forEach((t) => {
        if (t.amount >= 0) income += t.amount;
        else expense += Math.abs(t.amount);
      });

      setData([
        { name: 'Income', amount: income },
        { name: 'Expenses', amount: expense }
      ]);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseBarChart;
