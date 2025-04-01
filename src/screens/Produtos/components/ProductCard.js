import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
      {<img 
        //src={product.image} 
        alt={product.nome} 
        className="w-full h-48 object-cover"
      /> }
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.nome}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.descricao}</p>
        <div className="mt-2">
          <span className={`text-sm ${product.qtd_estoque < 5 ? 'text-red-600' : 'text-green-600'}`}>
            {product.qtd_estoque === 0 ? 'Fora de estoque' : `${product.qtd_estoque} unidades em estoque`}
          </span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold whitespace-nowrap px-2">R$ {product.preco.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.qtd_estoque === 0}
            className={`rounded-full flex items-center gap-2 transition-colors justify-center ${
              product.qtd_estoque === 0
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <ShoppingCart size={20} />
            {product.qtd_estoque === 0 ? 'Indisponível' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
