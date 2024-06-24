
export interface CriaUsuarioDTO {
    email: string;
    nome_completo: string;
    senha: string;
    role: string;
    apelido: string;
    resumo?: string;
    formacao?: string;
    exp_profissional?: string;
}