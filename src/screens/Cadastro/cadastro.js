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

    const [mensagem, setMensagem] = useState('');

    // Atualiza os dados do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCadastro = async (e) => {
        e.preventDefault();
        try {
            const response = await cadastros(
                formData.nome, 
                formData.telefone, 
                formData.cpf, 
                formData.rua, 
                formData.bairro, 
                formData.cidade, 
                formData.email, 
                formData.senha
            );
    
            console.log("Dados recebidos:", response);
    
            if (response && response.cliente) {
                localStorage.setItem('cliente', JSON.stringify(response.cliente)); // Armazena os dados do cliente
                navigate('/produtos'); // Redireciona para a página de produtos
            } else {
                setMensagem('Cadastro realizado, mas não foi possível logar automaticamente.');
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            setMensagem('Erro de conexão com o servidor.');
        }
    };

    return (
        <div className="container">
            <div className="logo-container">
                <img className="logo" src={logo} alt="logo" />
            </div>

            <div className="formulario">
                <form onSubmit={handleCadastro}>
                    <h2>Cadastro</h2>

                    <label>
                        Nome:
                        <input 
                        type="text" 
                        name="nome" 
                        value={formData.nome} 
                        onChange={handleChange} 
                        required 
                        placeholder="Digite seu nome completo"/>
                    </label>

                    <label>
                        CPF:
                        <input type="text" 
                        name="cpf" 
                        value={formData.cpf} 
                        onChange={handleChange} 
                        required maxLength="14"
                        placeholder="Digite seu cpf" 
                        />
                    </label>

                    <label>
                        Senha:
                        <input 
                        type="password" 
                        name="senha" 
                        value={formData.senha} 
                        onChange={handleChange} 
                        required 
                        placeholder="Digite sua senha"/>
                    </label>

                    <label>
                        Endereço:
                        <input 
                        type="text" 
                        name="rua" 
                        value={formData.rua} 
                        onChange={handleChange} 
                        required 
                        placeholder="Digite seu endereço completo" />
                    </label>

                    <label>
                        Email:
                        <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required placeholder="Digite seu email" />
                    </label>

                    <label>
                        Telefone:
                        <input 
                        type="text" 
                        name="telefone" 
                        value={formData.telefone} 
                        onChange={handleChange} 
                        required 
                        placeholder="Digite seu telefone" />
                    </label>

                    <label>
                        Cidade:
                        <input 
                        type="text" 
                        name="cidade" 
                        value={formData.cidade} 
                        onChange={handleChange} 
                        required 
                        placeholder="Digite sua Cidade" />
                    </label>

                    <button type="submit">Cadastrar</button>
                    <p>{mensagem}</p>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;
