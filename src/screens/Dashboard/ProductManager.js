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