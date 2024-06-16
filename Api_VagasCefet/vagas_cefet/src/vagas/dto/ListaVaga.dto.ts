export class ListaVagaDTO  {
    readonly id: string;
    readonly email: string;
    readonly nome_completo: string;

    constructor(vaga: {
        id: string,
        email: string,
        nome_completo: string,

    }) {
        this.id = vaga.id;
        this.email = vaga.email;
        this.nome_completo = vaga.nome_completo;
    }
}