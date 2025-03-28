import api from "./api"
//import {jwtDecode} from "jwt-decode";

export const cadastros = async (nome, telefone, cpf, rua, bairro, cidade, email, senha) => {
    try{
        const response = await api.post('/cliente/registro', {nome, telefone, cpf, rua, bairro, cidade, email, senha});
        console.log(response.data);
        return response.data;
    }catch(error){
        console.error("Erro no cadastro:", error);
        throw new Error('Falha no cadastro');
    }
}
