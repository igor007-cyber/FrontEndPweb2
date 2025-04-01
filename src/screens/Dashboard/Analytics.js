import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dailySales, monthlySales, weeklySales, yearlySales } from '../data/salesData';

export const Analytics = () => {
  const [period, setPeriod] = useState('daily'); // Removido o tipo 'Period'

  const getData = () => {
    switch (period) {
      case 'daily':
        return dailySales;
      case 'weekly':
        return weeklySales;
      case 'monthly':
        return monthlySales;
      case 'yearly':
        return yearlySales;
      default:
        return dailySales;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Análise de Vendas</h2>
        <div className="flex gap-4">
          {['daily', 'weekly', 'monthly', 'yearly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg hover:bg-green-600 ${
                period === p
                  ? 'text-white bg-green-600'
                  : 'bg-blue-600 hover:bg-gray-200'
              }`}
            >
              {p === 'daily' && 'Diário'}
              {p === 'weekly' && 'Semanal'}
              {p === 'monthly' && 'Mensal'}
              {p === 'yearly' && 'Anual'}
            </button>
          ))}
        </div>
      </div>



      <div className="bg-white p-6 rounded-lg shadow-lg" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={getData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics
