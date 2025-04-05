import React, { useEffect, useState } from 'react';
import { listarPedidos } from '../../api/pedido';
import { buscarPedidoComProdutos } from '../../api/pedidohasproduto';

export const Orders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidosComProdutos = async () => {
      try {
        const response = await listarPedidos();
        const pedidosBasicos = response.pedidos || [];
        
        const pedidosCompletos = await Promise.all(
          pedidosBasicos.map(async (pedido) => {
            try {
              return await buscarPedidoComProdutos(pedido.id);
            } catch (err) {
              console.error(`Erro no pedido ${pedido.id}:`, err);
              return {
                ...pedido,
                produtos: []
              };
            }
          })
        );
        
        setPedidos(pedidosCompletos.filter(p => p));
      } catch (error) {
        console.error("Erro ao listar pedidos:", error);
        setError('Falha ao carregar pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidosComProdutos();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

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
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pedido.Cliente?.nome || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {pedido.produtos?.map((produto, idx) => (
                    <div key={`${pedido.id}-${produto.idProducts || idx}`} className="text-sm mb-1">
                      • {produto.name || produto.nome || 'Produto sem nome'}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {pedido.produtos?.map((produto, idx) => (
                    <div key={`qtd-${pedido.id}-${produto.idProducts || idx}`} className="text-sm mb-1">
                      {produto.quantidade}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  R$ {pedido.valor_total?.toFixed(2) || '0.00'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pedido.data_pedido && new Date(pedido.data_pedido).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;