import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from './data';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { ShoppingBag } from 'lucide-react';
import logo from '../../assets/logo.png'; // Ajuste o caminho conforme sua estrutura

function Produto() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação simulado
  const [user, setUser] = useState(''); // Nome do usuário simulado

  const categories = ['all', 'clothes', 'accessories', 'shoes', 'hats', 'bags', 'watches', 'pants'];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    if (product.stock === 0) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          alert('Desculpe, não há mais unidades disponíveis deste produto.');
          return prevItems;
        }
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const product = products.find(p => p.id === id);
          if (product && quantity > product.stock) {
            alert('Desculpe, não há mais unidades disponíveis deste produto.');
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser('');
    // Adicione aqui qualquer outra lógica de logout necessária
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header com menu integrado */}
      <header className="bg-black shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-8">
              <img className="h-12" src={logo} alt="Logo Caio Sports"/>
            </div>
            
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="text-white hover:text-green-600 font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/produto" className="text-white hover:text-green-600 font-medium">
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link to="/cadastro" className="text-white hover:text-green-600 font-medium">
                    Cadastrar
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">{user}</span>
                  <button 
                    onClick={handleLogout}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="px-3 py-1 text-sm  text-white rounded hover:bg-green-900"
                >
                  Login
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:bg-green-900 rounded-full bg-black"
            >
              <ShoppingBag size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6 flex gap-3 overflow-x-auto pb-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full capitalize whitespace-nowrap text-sm ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <Cart
        items={cartItems}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClose={() => setIsCartOpen(false)}
        isOpen={isCartOpen}
      />
    </div>
  );
}

export default Produto;