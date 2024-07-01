import { UsuarioEntity } from "src/usuario/usuario.entity";
import { VagaEntity } from "src/vaga/vaga.entity";

export class DescricaoInscricaoDTO  {
    readonly id: string;
    readonly status: string;
    readonly visto: boolean;
    readonly alunoId: string;
    readonly vagaId: string;
    readonly criada_em: string; 
    readonly atualizada_em: string;

    constructor(inscricao: {
        id: string,
        status: string;
        visto: boolean;
        alunoId: string;
        vagaId: string;
        createdAt: string; 
        updatedAt: string; 
    }) {
        this.id = inscricao.id;
        this.status = inscricao.status;
        this.visto = inscricao.visto;
        this.alunoId = inscricao.alunoId;
        this.vagaId = inscricao.vagaId;
        this.criada_em = inscricao.createdAt;
        this.atualizada_em = inscricao.updatedAt;
    }
}