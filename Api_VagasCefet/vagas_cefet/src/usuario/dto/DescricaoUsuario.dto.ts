export class DescricaoUsuarioDTO  {
    readonly id: string;
    readonly email: string;
    readonly nome_completo: string;
    readonly role: string;
    readonly apelido: string;
    readonly resumo: string; 
    readonly formacao: string; 
    readonly exp_profissional: string;

    constructor(usuario: {
        id: string,
        email: string,
        nome_completo: string,
        role: string,
        apelido: string,
        resumo: string, 
        formacao: string, 
        exp_profissional: string
    }) {
        this.id = usuario.id;
        this.email = usuario.email;
        this.nome_completo = usuario.nome_completo;
        this.role = usuario.role;
        this.apelido = usuario.apelido;
        this.resumo = usuario.resumo;
        this.formacao = usuario.formacao;
        this.exp_profissional = usuario.exp_profissional;
    }
}