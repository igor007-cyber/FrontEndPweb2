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

