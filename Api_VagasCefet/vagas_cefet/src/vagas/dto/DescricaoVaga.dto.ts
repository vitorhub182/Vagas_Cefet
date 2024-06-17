import { IntegerType } from "typeorm";

export class DescricaoVagaDTO  {
    readonly id: string;
    readonly titulo: string;
    readonly contratante: string;
    readonly tipo: string;
    readonly requisitos: string;
    readonly detalhes: string; 
    readonly status: number; 

    constructor(vaga: {
        id: string,
        titulo: string;
        contratante: string;
        tipo: string;
        requisitos: string;
        detalhes: string; 
        status: number; 
    }) {
        this.id = vaga.id;
        this.titulo = vaga.titulo;
        this.contratante = vaga.contratante;
        this.tipo = vaga.tipo;
        this.requisitos = vaga.requisitos;
        this.detalhes = vaga.detalhes;
        this.status = vaga.status;
    }
}