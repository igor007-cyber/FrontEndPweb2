import React from 'react';
import { orders } from '../data/orders';

export const Orders = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pedidos</h2>
      <div className="overflow-x-auto rounded-s-xl">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-blue-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Produtos
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Endereço
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Data
              </th>
            </tr>
          </thead>