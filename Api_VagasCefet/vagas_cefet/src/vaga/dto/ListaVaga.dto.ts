export class ListaVagaDTO  {
    readonly id: string;
    readonly titulo: string;
    readonly tipo: string;
    readonly status: number;

    constructor(vaga: {
        id: string,
        titulo: string,
        tipo: string,
        status: number

    }) {
        this.id = vaga.id;
        this.titulo = vaga.titulo;
        this.tipo = vaga.tipo;
        this.status = vaga.status;
    }
}