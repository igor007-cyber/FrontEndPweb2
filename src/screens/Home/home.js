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
                        <li><Link to="/cadastro" className="text-white no-underline text-base font-bold hover:text-green-300">Cadastrar</Link></li>
                    </ul>
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

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center text-center gap-5 w-full h-full bg-white">
                {/* Video Section */}
                <div className="flex flex-col items-center gap-4 w-full bg-white text-center">
                    <div className="relative w-full h-[calc(100vh-40px)] bg-black flex justify-center items-center overflow-hidden mb-5">
                        <video
                            src="../../../public/CaioSports.mp4"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                            title="Vídeo de modelos Caio Sports"
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        ></video>
                    </div>
                    <h3 className="text-center text-xl text-gray-800 mt-[100px] mb-8 font-bold">Temos aqui modelos de vários tipos</h3>

                    {/* Products Grid */}
                    <div className="bg-white flex justify-center gap-5 flex-wrap mb-14">
                        <div className="flex flex-col items-center text-center w-[350px] gap-2">
                            <img src={roupa} alt="Roupas" className="w-full h-auto rounded-lg shadow-md hover:scale-110 hover:rotate-x-10 hover:rotate-y-10 hover:shadow-xl transition-all duration-300" />
                            <p className="text-base text-gray-800 font-bold hover:text-green-500 hover:scale-110 hover:text-shadow-md transition-all duration-300">Roupas</p>
                        </div>
                        <div className="flex flex-col items-center text-center w-[350px] gap-2">
                            <img src={sapato} alt="Sapatos" className="w-full h-auto rounded-lg shadow-md hover:scale-110 hover:rotate-x-10 hover:rotate-y-10 hover:shadow-xl transition-all duration-300" />
                            <p className="text-base text-gray-800 font-bold hover:text-green-500 hover:scale-110 hover:text-shadow-md transition-all duration-300">Sapatos</p>
                        </div>
                        <div className="flex flex-col items-center text-center w-[350px] gap-2">
                            <img src={acessorio} alt="Acessórios" className="w-full h-auto rounded-lg shadow-md hover:scale-110 hover:rotate-x-10 hover:rotate-y-10 hover:shadow-xl transition-all duration-300" />
                            <p className="text-base text-gray-800 font-bold hover:text-green-500 hover:scale-110 hover:text-shadow-md transition-all duration-300">Acessórios</p>
                        </div>
                    </div>
                </div>

                {/* Instagram Section */}
                <div className="w-full bg-black flex justify-center items-center py-5">
                    <a 
                        href="https://www.instagram.com/caio_sports2023/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block text-center"
                    >
                        <img 
                            src={instagramIcon} 
                            alt="Instagram Caio Sports" 
                            className="max-w-[90%] h-auto rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                        />
                    </a>
                </div>

                {/* Purchase Section */}
                <div className="flex items-center justify-center gap-5 my-5 bg-white">
                    <div className="flex-shrink-0">
                        <img src={pessoa} alt="Modelo de pessoa" className="w-[450px] h-auto" />
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <p>
                            <img src={chamada} alt="Nossos produtos" className="apresentacao" />
                        </p>
                        <Link to="/produtos" className="relative inline-block">
                            <img 
                                src={seta} 
                                alt="Ver produtos" 
                                className="w-[150px] h-auto relative top-[-100px] hover:scale-125 transition-transform duration-300"
                                style={{
                                    animation: 'move-up-down 2s infinite'
                                }}
                            />
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-black text-white flex flex-col justify-center items-center py-5 gap-5">
                <img src={logo} alt="Logo Caio Sports" className="h-[200px] w-auto" />
                <p className="text-base m-0 text-center font-bold">Caio Sports 2023</p>
            </footer>

            {/* Animation Keyframes (in style tag since Tailwind doesn't support keyframes directly) */}
            <style>
                {`
                @keyframes move-up-down {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-60px);
                    }
                }
                `}
            </style>
        </div>
    );
}

export default Home;