export class DescricaoUsuarioDTO  {
    constructor (
        readonly id: string,
        readonly email: string,
        readonly nome: string,
        readonly role: string,
        
    ){}
}