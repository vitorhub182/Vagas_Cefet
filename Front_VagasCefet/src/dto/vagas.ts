
export interface DescricaoVagasDTO {
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