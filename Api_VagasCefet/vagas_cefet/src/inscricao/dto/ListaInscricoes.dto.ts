import { UsuarioEntity } from "src/usuario/usuario.entity";
import { VagaEntity } from "src/vaga/vaga.entity";

export class ListaInscricoesDTO  {
    readonly id: string;
    readonly alunoId: string;
    readonly vagaId: string;
    readonly status: number;
    
    readonly nome_aluno: string;
    readonly titulo_vaga: string;

    constructor(inscricao: {
        id: string,
        alunoId: string,
        vagaId: string,
        status: number,
        usuario: UsuarioEntity | undefined,
        vaga: VagaEntity | undefined,

    }) {
        this.id = inscricao.id;
        this.alunoId = inscricao.alunoId;
        this.vagaId = inscricao.alunoId;
        this.status = inscricao.status;

        this.nome_aluno = inscricao.usuario?.nome_completo;
        this.titulo_vaga = inscricao.vaga?.titulo;
    }
}