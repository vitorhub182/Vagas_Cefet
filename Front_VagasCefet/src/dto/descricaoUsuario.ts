
export interface DescricaoUsuarioDTO {
    email: string;
    nome_completo: string;
    role: string;
    apelido: string;
    resumo?: string;
    formacao?: string;
    exp_profissional?: string;
}