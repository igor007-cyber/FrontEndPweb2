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
