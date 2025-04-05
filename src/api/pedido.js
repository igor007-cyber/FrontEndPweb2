import api from "./api"
//import {jwtDecode} from "jwt-decode";

export const pedidos = async (data_pedido, status, valor_total, data_envio, data_status, idCliente, descricao) => {
    
    try{
        const response = await api.post('/pedido/adicionar', {data_pedido, status, valor_total, data_envio, data_status, idCliente, descricao});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.error("Erro no cadastro:", error);
        throw new Error('Falha no cadastro');
    }
}

export const listarPedidos = async () => {
    try{
        const response = await api.get('/pedido/listar');
        return response.data;
    }catch(error){
        throw new Error('Falha de listar de produtos');
    }   
}