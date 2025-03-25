import React from 'react';
import { orders } from '../data/orders';

export const Orders = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pedidos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produtos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Endereço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.customerName}
                </td>
                <td className="px-6 py-4">
                  {order.products.map((product, index) => (
                    <div key={index} className="text-sm">
                      {product.name} (x{product.quantity})
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {order.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  R$ {order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(order.date).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders