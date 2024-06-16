export class ListaUsuarioDTO  {
    readonly id: string;
    readonly email: string;
    readonly nome_completo: string;

    constructor(usuario: {
        id: string,
        email: string,
        nome_completo: string,

    }) {
        this.id = usuario.id;
        this.email = usuario.email;
        this.nome_completo = usuario.nome_completo;
    }
}