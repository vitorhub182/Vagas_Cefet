
export interface DescricaoVagaDTO {
    id: string,
    titulo: string;
    contratante: string;
    tipo: string;
    requisitos: string;
    detalhes: string; 
    status: number; 
    professorId: string;
}

export interface ListaVagasDTO {
    id: string,
    titulo: string;
    tipo: string;
    status: number;
}

export interface CriaVagaDTO {
    
    titulo: string;    
    contratante: string;
    tipo: string;
    requisitos: string;
    detalhes?: string;
    status: number;
    professorId: string;
}

export interface AtualizaVagaDTO {
    id: string;
    titulo?: string;    
    contratante?: string;
    tipo?: string;
    requisitos?: string;
    detalhes?: string;
    status?: number;
}