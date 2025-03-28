import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "../screens/Home/home";
import Login from "../screens/Login/login";
import Cadastro from "../screens/Cadastro/cadastro";
import Produto from "../screens/Produtos/produto";
import Dashboard from "../screens/Dashboard";
import React, {useEffect, useState} from "react";


const AppRoutes = ({ isAuthenticated, setAuthenticated }) => {

    const [userType, setUserType] = useState(localStorage.getItem('userType'));

    useEffect(() => {
        const type =  localStorage.getItem('userType');
        setUserType(type);
    }, [isAuthenticated]);

    const handleLogin = () => {
        setAuthenticated(true);
    }



export default AppRoutes;