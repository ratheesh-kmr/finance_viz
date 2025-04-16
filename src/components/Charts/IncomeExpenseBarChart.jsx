import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const IncomeExpenseBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://finance-viz-backend.onrender.com/api/transactions');

        let income = 0;
        let expense = 0;

        res.data.forEach((t) => {
          const amt = Number(t.amount);
          if (t.type === 'income') {
            income += amt;
          } else if (t.type === 'expense') {
            expense += amt;
          }
        });

        setData([
          { name: 'Income', amount: income },
          { name: 'Expenses', amount: expense }
        ]);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
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
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="amount"
            fill="#8884d8"
            barSize={50}
            radius={[10, 10, 0, 0]} // Rounded top corners for the bars
            animationDuration={800} // Smooth animation for the bars
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseBarChart;
