import api from "./api"

export const login = async (email, password) => {
    try{
        const response = await api.post('/auth/login', {email, password})
        const {token} = response.data
        localStorage.setItem('token', token)
    // eslint-disable-next-line no-unused-vars
    }catch(error){
        throw new Error('Falha na autenticação')
    }
}
