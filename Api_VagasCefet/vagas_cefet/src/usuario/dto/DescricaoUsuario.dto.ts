import { ApiProperty } from "@nestjs/swagger";

export class DescricaoUsuarioDTO  {
    @ApiProperty({ example: '41810567-20a6-47bc-a50f-c6025bef31ce', description: 'UUID do usuário' })
    readonly id: string;

    @ApiProperty({ example: 'usuario@example.com', description: 'E-mail do usuário' })
    readonly email: string;

    @ApiProperty({ example: 'Fulano da Silva', description: 'Nome completo do usuário' })
    readonly nome_completo: string;

    @ApiProperty({ example: 'professor', description: 'Função do usuário' })
    readonly role: string;

    @ApiProperty({ example: 'fulano123', description: 'Apelido do usuário' })
    readonly apelido: string;

    @ApiProperty({ example: 'Resumo profissional do usuário', description: 'Resumo do usuário' })
    readonly resumo: string;

    @ApiProperty({ example: 'Graduação em Informática', description: 'Formação acadêmica do usuário' })
    readonly formacao: string;

    @ApiProperty({ example: 'Experiência em desenvolvimento web', description: 'Experiência profissional do usuário' })
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