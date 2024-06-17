export class ListaVagaDTO  {
    readonly id: string;
    readonly titulo: string;
    readonly tipo: string;

    constructor(vaga: {
        id: string,
        titulo: string,
        tipo: string,

    }) {
        this.id = vaga.id;
        this.titulo = vaga.titulo;
        this.tipo = vaga.tipo;
    }
}