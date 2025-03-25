import api from "./api"
import {jwtDecode} from "jwt-decode";

export const login = async (email, senha) => {
    try{
        const response = await api.post('/login', {email, senha});
        const { token } = response.data;
        const decode = jwtDecode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('userType', decode.tipo);
    }catch(error){
        throw new Error('Falha na autenticação')
    }
}

export const logout = () => {
    localStorage.removeItem('token')
}
