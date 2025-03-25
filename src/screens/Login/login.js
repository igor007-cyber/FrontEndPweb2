import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './estilo.css'; // Importação do CSS
import logo from '../../assets/logo2.png';
import {login} from "../../api/auth"; // Importação da imagem

function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        email: '',
        senha: '',
    });

    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    //Função para atualizar os dados do formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Função para lidar com o login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.senha);
            onLogin();
        } catch (error) {
            console.error('Erro de conexão:', error);
            setMensagem('Erro de conexão com o servidor.');
        }
    };

    // Função para redirecionar para a página de cadastro
    const handleCadastro = () => {
        navigate('/cadastro');
    };

    return (
        <div className="container2">
            {/* Logo */}
            <div className="logo-container2">
                <img className="logo2" src={logo} alt="Logo Caio Sports" />
            </div>

            {/* Formulário de Login */}
            <div className="formulario">
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>

                    {/* Campo de Email */}
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    {/* Campo de Senha */}
                    <label>
                        Senha:
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    {/* Botões de Login e Cadastro */}
                    <div className="botoes">
                        <button className="botao" type="submit">Logar</button>
                        <button className="botao" type="button" onClick={handleCadastro}>
                            Cadastrar
                        </button>
                    </div>

                    {/* Mensagem de Feedback */}
                    <p>{mensagem}</p>
                </form>
            </div>
        </div>
    );
}

export default Login;