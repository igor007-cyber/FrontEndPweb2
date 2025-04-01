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
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <nav className="mt-6">
            {tabs.map(({ id, label, icon: Icon, action }) => (
              <button
                key={id}
                onClick={() => (action ? action() : setActiveTab(id))}
                className={`w-full flex items-center gap-3 px-6 py-4 text-left bg-blue-50 text-black ${
                  activeTab === id
                    ? 'border-r-4 border-blue-600 text-blue-600 hover:bg-blue-300 bg-blue-50 '
                    : 'text-gray-600 hover:bg-blue-300'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'products' && <ProductManager />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard