import { UsuarioEntity } from "src/usuario/usuario.entity";
import { VagaEntity } from "src/vaga/vaga.entity";

export class ListaInscricoesDTO  {
    readonly id: string;
    readonly alunoId: string;
    readonly vagaId: string;
    readonly status: string;

    constructor(inscricao: {
        id: string,
        alunoId: string,
        vagaId: string
        status: string,

    }) {
        this.id = inscricao.id;
        this.alunoId = inscricao.alunoId;
        this.vagaId = inscricao.alunoId;
        this.status = inscricao.status;
    }
}