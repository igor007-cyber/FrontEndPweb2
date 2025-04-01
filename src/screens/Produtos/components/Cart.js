import React, { useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { products } from '../data';

const Cart = ({ items, onRemoveFromCart, onUpdateQuantity, onClose, isOpen }) => {
  const total = items.reduce((sum, item) => sum + item.preco * item.quantity, 0);

  useEffect(() => {
    console.log('itens', items);
  }, [items]);

  const handleCheckout = () => {  
    const invalidItems = items.filter(item => {
      const product = products.find(p => p.id === item.id);
      return product && item.quantity > product.qtd_estoque;
    });

    if (invalidItems.length > 0) {
      alert('Alguns itens não estão mais disponíveis na quantidade selecionada. Por favor, revise seu carrinho.');
      return;
    }

    alert('Compra finalizada! Total: R$ ' + total.toFixed(2));
    onClose();
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
                   <img alt={item.nome} className="w-20 h-20 object-cover rounded" />  {/* src={item.image}  */}
                    <div className="flex-1">
                      <h3 className="font-semibold whitespace-nowrap">{item.nome}</h3>
                      <p className="text-gray-600">R$ {item.preco.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.qtd_estoque, Math.max(0, item.quantity - 1))}
                          className="px-2 py-1 bg-blue-600 rounded"
                        >