import React, { useState } from 'react';
import { Analytics } from './Analytics';
import { Orders } from './Orders';
import { ProductManager } from './ProductManager';
import { BarChart3, ShoppingBag, Package, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export const Dashboard = ({ setAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('analytics'); // Removido o tipo 'Tab'
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate('/login');
  };

  const tabs = [
    { id: 'analytics', label: 'Análise', icon: BarChart3 },
    { id: 'orders', label: 'Pedidos', icon: ShoppingBag },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'logout', label: 'Sair', icon: LogOut, action: handleLogout }
  ];