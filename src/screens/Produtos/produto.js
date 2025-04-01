import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import { Products } from './data';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { ShoppingBag } from 'lucide-react';
import logo from '../../assets/logo.png'; // Ajuste o caminho conforme sua estrutura
//import api from '../../api/api';
import { listarProdutos } from '../../api/produto';

function Produto({ setAuthenticated, isAuthenticated}) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  const storedUser = localStorage.getItem('user'); 
  if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      setAuthenticated(true);
  }
  }, []);

  const handleLogout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      setAuthenticated(false);
      navigate('/');
  };

  const categories = ['all', 'clothes', 'accessories', 'shoes', 'hats', 'bags', 'watches', 'pants'];

  const [products, setProducts] = useState([])

  useEffect(() => {
    listarProdutos().then((response) => {
      setProducts(response.produtos);
    }) 
  },[                           ])

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


