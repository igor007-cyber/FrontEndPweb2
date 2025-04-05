import React, { useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { products } from '../data';
import { pedidos } from '../../../api/pedido';
import { MandarPedido } from '../../../api/pedidohasproduto';

const Cart = ({ items, onRemoveFromCart, onUpdateQuantity, onClose, isOpen, cliente }) => {
  const total = items.reduce((sum, item) => sum + item.preco * item.quantity, 0);

  useEffect(() => {
    console.log('itens', items);
  }, [items]);

  const handleCheckout = async () => {
    const invalidItems = items.filter(item => {
        const product = products.find(p => p.id === item.id);
        return product && item.quantity > product.qtd_estoque;
    });

    if (invalidItems.length > 0) {
        alert('Alguns itens não estão mais disponíveis na quantidade selecionada. Por favor, revise seu carrinho.');
        return;
    }

    try {
        // 🛒 Primeiro, cria o pedido
        const novoPedido = await pedidos(
            new Date().toISOString().split('T')[0], // data_pedido
            true, // status (ajuste se necessário)
            total, // valor_total
            new Date().toISOString().split('T')[0], // data_envio
            new Date().toISOString().split('T')[0], // data_status
            1, // idCliente (ajuste conforme sua lógica)
            "Pedido realizado pelo sistema" // descricao
        );

        // ⚡ Ajuste aqui: confirmar se vem `novoPedido.idPedido`
        const idPedido = novoPedido.idPedido; 
        console.log("Pedido criado com sucesso, ID:", idPedido);

        // 🛒 Depois, adiciona os produtos ao pedido
        for (const item of items) {
            console.log(`Adicionando produto: ${item.nome}, ID: ${item.id}, Quantidade: ${item.quantity}, Preço: ${item.preco}`);
            await MandarPedido(idPedido, item.id, item.quantity, item.preco);
        }

        alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}`);
        onClose();
    } catch (error) {
        console.error("Erro ao finalizar a compra:", error);
        alert("Erro ao finalizar a compra. Tente novamente mais tarde.");
    }
};



  return (
    <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag />
            Carrinho
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 bg-white mr-auto justify-items-center">
            <X size={24} />
          </button>
        </div>
        
        {items.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">Seu carrinho está vazio</p>
        ) : (
          <>
            <div className="space-y-4 flex-1 overflow-y-auto pr-2" style={{ maxHeight: '60vh' }}>
              {items.map((item) => {
                const product = products.find(p => p.id === item.id);
                return (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                   <img src={item.image} alt={item.nome} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold whitespace-nowrap">{item.nome}</h3>
                      <p className="text-gray-600">R$ {item.preco.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.qtd_estoque, Math.max(0, item.quantity - 1))}
                          className="px-2 py-1 bg-blue-600 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => 
                            onUpdateQuantity(item.id, item.qtd_estoque, item.quantity + 1)}
                          className="px-2 py-1 bg-blue-600 rounded"
                          disabled={product && item.quantity >= product.qtd_estoque}
                        >
                          +
                        </button>
                      </div>
                      {product && (
                        <p className="text-sm text-gray-500 mt-1">
                          Disponível: {item.qtd_estoque}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-black bg-white hover:text-red-700 justify-items-center"
                    >
                      <X size={20}/>
                    </button>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
