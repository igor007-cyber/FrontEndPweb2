import api from "./api"
//import {jwtDecode} from "jwt-decode";

export const MandarPedido = async (idPedido, idProduto, quantidade, preco_unitario) => {
    try{
        const response = await api.post(`/compra/pedidos/${idPedido}/produtos`, { idPedido, idProduto, quantidade, preco_unitario });
        console.log(response.data);
        return response.data;
    }catch(error){
        console.error("Erro no cadastro:", error);
        throw new Error('Falha no cadastro');
    }
}

export const buscarPedidoComProdutos = async (idPedido) => {
    try {
        console.log(`[1] Buscando pedido ${idPedido} com produtos`);
        
        // 1. Busca os dados do pedido
        const pedidoResponse = await api.get(`/pedido/pedidos/${idPedido}`);
        const { message: msgPedido, pedido } = pedidoResponse.data;
        console.log('[2] Dados do pedido:', pedido);

        // 2. Busca os produtos do pedido
        const produtosResponse = await api.get(`/compra/pedidos/${idPedido}/produtos`);
        const { produtos } = produtosResponse.data;
        console.log('[3] Produtos do pedido:', produtos);

        // 3. Estrutura a resposta final
        const resultado = {
            ...pedido,
            produtos: produtos || [],
            message: msgPedido
        };

        console.log('[4] Resultado final:', resultado);
        return resultado;

    } catch (error) {
        console.error('[ERRO] Falha ao buscar pedido com produtos:', error);
        throw new Error(`Erro ao buscar pedido ${idPedido}: ${error.message}`);
    }
};