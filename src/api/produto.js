import api from "./api"
//import {jwtDecode} from "jwt-decode";

export const produto = async (nome, descricao, preco, categoria, qtd_estoque) => {
    try{
        const response = await api.post('/produto/cadastrar', {nome, descricao, preco, categoria, qtd_estoque});
        return response.data;
    }catch(error){
        throw new Error('Falha no cadastro');
    }
}

export const listarProdutos = async () => {
    try{
        const response = await api.get('/produto/listar');
        return response.data;
    }catch(error){
        throw new Error('Falha de listar de produtos');
    }
    
}
