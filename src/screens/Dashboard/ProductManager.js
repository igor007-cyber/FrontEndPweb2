import React, { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, Edit, Save, X, Plus } from 'lucide-react';
import Papa from 'papaparse';
import api from '../../api/api';

export const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const fileInputRef = useRef(null);

  const listarProdutos = async () => {
    try {
      const response = await api.get('/produto/listar');
      if (response.data) {
        setProducts(response.data.produtos);
      }
    } catch (error) {
      console.error('Falha ao listar produtos:', error);
      alert('Erro ao carregar produtos');
    }
  };

  useEffect(() => {
    listarProdutos();
  }, []);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSave = async () => {
    if (!editForm.nome || !editForm.preco || !editForm.qtd_estoque) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      let response;
      if (editForm.id) {
        // Atualização de produto existente
        response = await api.put(`/produto/produtos/${editForm.id}`, editForm);
      } else {
        // Criação de novo produto
        response = await api.post('/produto/cadastrar', editForm);
      }

      if (response.status === 200 || response.status === 201) {
        await listarProdutos(); // Recarrega a lista de produtos
        setEditingId(null);
        setEditForm({});
      }
    } catch (error) {
      console.error('Falha ao salvar produto:', error);
      alert('Erro ao salvar produto');
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        const response = await api.delete(`/produto/produtos/${id}`);
        if (response.status === 200) {
          setProducts(products.filter(p => p.id !== id));
          alert('Produto excluído com sucesso');
        }
      } catch (error) {
        console.error('Falha ao excluir produto:', error);
        alert('Erro ao excluir produto');
      }
    }
  };

  const handleAdd = () => {
    const newProduct = {
      nome: 'Novo Produto',
      preco: 0,
      categoria: 'clothes',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      descricao: 'Descrição do produto',
      qtd_estoque: 0
    };
    setEditForm(newProduct);
    setEditingId('new'); // Usamos 'new' para identificar que é um novo produto
  };
   
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          try {
            // Envia cada produto para o backend
            for (const row of results.data) {
              await api.post('/produto/cadastrar', {
                nome: row.nome,
                preco: parseFloat(row.preco),
                categoria: row.categoria,
                image: row.image,
                descricao: row.descricao,
                qtd_estoque: parseInt(row.qtd_estoque, 10)
              });
            }
            // Recarrega a lista após importação
            await listarProdutos();
          } catch (error) {
            console.error('Erro ao importar produtos:', error);
            alert('Erro ao importar alguns produtos');
          }
        }
      });
    }
  };
