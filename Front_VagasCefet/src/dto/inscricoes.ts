
export interface DescricaoInscricaoDTO {
    id: string,
    status: number;
    visto: boolean;
    alunoId: string;
    vagaId: string;
    createdAt: string; 
    updatedAt: string; 
    nome_aluno: string;
    titulo_vaga:string;
}

export interface ListaInscricoesDTO {
    id: string,
    alunoId: string,
    vagaId: string,
    status: number,
    nome_aluno: string,
    titulo_vaga: string,
}

export interface CriaInscricaoDTO {
    
    alunoId: string;
    vagaId: string;
}

export interface AtualizaInscricaoDTO { 
    visto: boolean;
    status: number;
}