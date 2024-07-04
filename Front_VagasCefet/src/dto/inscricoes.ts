
export interface DescricaoInscricaoDTO {
    id: string,
    status: number;
    visto: boolean;
    alunoId: string;
    vagaId: string;
    createdAt: string; 
    updatedAt: string; 
}

export interface ListaInscricoesDTO {
    id: string,
    alunoId: string,
    vagaId: string,
    status: number,
}