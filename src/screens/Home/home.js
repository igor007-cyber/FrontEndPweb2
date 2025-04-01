import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
        const user = JSON.parse(storedUser);
        setUser(user);
    }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        setAuthenticated(false);
        navigate('/');
    };
    return (
        <div className="m-0 p-0 font-sans bg-white">
            {/* Header */}
            <header className="flex justify-between items-center w-full h-[90px] bg-black px-5 border-b border-white">
                {/* Logo */}
                <div className="flex items-center h-full">
                    <img className="h-full w-auto" src={logo} alt="Logo Caio Sports"/>
                </div>

                {/* Menu */}
                <nav className="flex-1 flex justify-center items-center">
                    <ul className="flex gap-5 m-0 p-0 list-none">
                        <li><Link to="/" className="text-white no-underline text-base font-bold hover:text-green-300">Home</Link></li>
                        <li><Link to="/produto" className="text-white no-underline text-base font-bold hover:text-green-300">Produto</Link></li>
                        {!isAuthenticated && (
                            <li><Link to="/cadastro" className="text-white no-underline text-base font-bold hover:text-green-300">Cadastrar</Link></li>
                        )}                    </ul>
                </nav>

                {/* Login/Logout */}
                <div className="flex items-center gap-2 mr-5">
                    {isAuthenticated ? (
                        <>
                            <span className="text-white text-base font-bold">{user}</span>
                            <button 
                                onClick={handleLogout}
                                className="text-white text-base font-bold hover:text-red-300"
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="text-white text-base font-bold no-underline hover:text-green-300">
                            Login
                        </Link>
                    )}
                </div>
            </header>
