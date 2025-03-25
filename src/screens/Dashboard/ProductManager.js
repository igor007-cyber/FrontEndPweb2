import React, { useState, useRef } from 'react';
import { Upload, Trash2, Edit, Save, X, Plus } from 'lucide-react';
import Papa from 'papaparse';
import { products as produto } from '../Produtos/data';

export const ProductManager = () => {
  const [products, setProducts] = useState(produto);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const fileInputRef = useRef(null);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSave = () => {
    if (!editForm.name || !editForm.price || !editForm.stock) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setProducts(products.map(p => 
      p.id === editingId ? { ...p, ...editForm } : p
    ));
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAdd = () => {
    const newProduct = {
      id: Math.max(...products.map(p => p.id)) + 1,
      name: 'Novo Produto',
      price: 0,
      category: 'clothes',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      description: 'Descrição do produto',
      stock: 0
    };
    setProducts([...products, newProduct]);
    handleEdit(newProduct);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const newProducts = results.data.map((row, index) => ({
            id: products.length + index + 1,
            name: row.name,
            price: parseFloat(row.price),
            category: row.category,
            image: row.image,
            description: row.description,
            stock: parseInt(row.stock, 10)
          }));
          setProducts([...products, ...newProducts]);
        }
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
        <div className="flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".csv"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Upload size={20} />
            Importar CSV
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Adicionar Produto
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estoque
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                {editingId === product.id ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={editForm.price || ''}
                        onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={editForm.stock || ''}
                        onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value, 10) })}
                        className="w-full p-2 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={editForm.category || ''}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full p-2 border rounded"
                      >
                        <option value="clothes">Roupas</option>
                        <option value="accessories">Acessórios</option>
                        <option value="shoes">Sapatos</option>
                        <option value="hats">Chapéus</option>
                        <option value="bags">Bolsas</option>
                        <option value="watches">Relógios</option>
                        <option value="pants">Calças</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="p-2 text-green-600 hover:text-green-800"
                        >
                          <Save size={20} />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditForm({});
                          }}
                          className="p-2 text-gray-600 hover:text-gray-800"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      R$ {product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4">
                      {product.category}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;