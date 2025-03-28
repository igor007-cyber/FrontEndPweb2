import './estilo.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import { cadastros } from '../../api/cadastro';

function Cadastro({ onCadastro }) {
    const navigate = useNavigate(); // Hook para redirecionamento
    const [formData, setFormData] = useState({
        nome: "", 
        telefone: "",
        cpf: "", 
        rua: "", 
        bairro: "",
        cidade: "",
        email: "", 
        senha: ""
    });

}