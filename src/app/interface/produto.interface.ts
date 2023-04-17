export interface ProdutoResponse {
    mensagem: string;
    status: string;
}

export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    data_cadastro: string;
    data_validade: string;
    dias_faltando?: string
    imagem: string;
}