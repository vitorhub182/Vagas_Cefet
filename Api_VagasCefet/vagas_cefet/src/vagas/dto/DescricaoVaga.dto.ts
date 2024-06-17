import { UsuarioEntity } from "src/usuario/usuario.entity";
import { IntegerType } from "typeorm";

export class DescricaoVagaDTO  {
    readonly id: string;
    readonly titulo: string;
    readonly contratante: string;
    readonly tipo: string;
    readonly requisitos: string;
    readonly detalhes: string; 
    readonly status: number;
    readonly professorId: string

    constructor(vaga: {
        id: string,
        titulo: string;
        contratante: string;
        tipo: string;
        requisitos: string;
        detalhes: string; 
        status: number; 
        usuario: UsuarioEntity;
    }) {
        this.id = vaga.id;
        this.titulo = vaga.titulo;
        this.contratante = vaga.contratante;
        this.tipo = vaga.tipo;
        this.requisitos = vaga.requisitos;
        this.detalhes = vaga.detalhes;
        this.status = vaga.status;
        this.professorId = vaga.usuario.id
    }
}