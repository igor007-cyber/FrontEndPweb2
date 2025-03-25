import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './estilo.css';

// Importação das imagens
import logo from '../../assets/logo2.png';
import roupa from '../../assets/modelos/roupa.jpeg';
import sapato from '../../assets/modelos/sapato.jpg';
import acessorio from '../../assets/modelos/acessorio.jpeg';
import instagramIcon from '../../assets/modelos/instagram.png';
import pessoa from '../../assets/pessoa.png';
import chamada from '../../assets/modelos/chamada.png';
import seta from '../../assets/modelos/seta.png';

function Home({ setAuthenticated, isAuthenticated }) {
    const [user, setUser] = useState("Nome do usuário");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setAuthenticated(false);
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="header">
                <div className="Logo1">
                    <img className="logo1" src={logo} alt="Logo Caio Sports"/>
                </div>
                <div className="menu">
                    <nav className="menu-nav">
                        <ul>
                            <li><Link to="/" className="nave">Home</Link></li>
                            <li><Link to="/produto" className="nave">Produto</Link></li>
                            <li><Link to="/cadastro" className="nave">Cadastrar</Link></li>
                            <li><Link to="/Dashboard" className="nave">Dashboard</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="icon">
                    {isAuthenticated ? (
                        <>
                            <span className="login">{user}</span>
                            <button className="logout" onClick={handleLogout}>Sair</button>
                        </>
                    ) : (
                        <Link to="/login" className="login">Login</Link>
                    )}
                </div>
            </div>

            <div className="corpo">
                <div className="modelo">
                    <div className="video-container">
                        <video
                            src="../../../public/CaioSports.mp4"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                            title="Vídeo de modelos Caio Sports"
                        ></video>
                    </div>
                    <h3 className="texto">Temos aqui modelos de vários tipos</h3>

                    <div className="img-produtos">
                        <div>
                            <img src={roupa} alt="Roupas" />
                            <p>Roupas</p>
                        </div>
                        <div>
                            <img src={sapato} alt="Sapatos" />
                            <p>Sapatos</p>
                        </div>
                        <div>
                            <img src={acessorio} alt="Acessórios" />
                            <p>Acessórios</p>
                        </div>
                    </div>
                </div>

                <div className="mostruario-instagram">
                    <a className="instagram" href="https://www.instagram.com/caio_sports2023/" target="_blank" rel="noopener noreferrer">
                        <img className="imgInstagram" src={instagramIcon} alt="Instagram Caio Sports" />
                    </a>
                </div>

                <div className="Compra">
                    <div className="pessoa">
                        <img className="pessoa-modelo" src={pessoa} alt="Modelo de pessoa" />
                    </div>
                    <div>
                        <p>
                            <img className="apresentacao" src={chamada} alt="Nossos produtos" />
                        </p>
                        <Link to="/produtos" className="link-img-modelo">
                            <img src={seta} alt="Ver produtos" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="footer">
                <div>
                    <img src={logo} alt="Logo Caio Sports" />
                    <p>Caio Sports 2023</p>
                </div>
            </div>
        </div>
    );
}

export default Home;