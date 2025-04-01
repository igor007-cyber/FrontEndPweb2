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