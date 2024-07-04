
export interface DescricaoUsuarioDTO {
    email: string;
    nome_completo: string;
    role: string;
    apelido: string;
    resumo?: string;
    formacao?: string;
    exp_profissional?: string;
}

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
export interface FalhaCadastroDTO  {
    message: string[];
    error: string;
    statusCode: number;
  }

  export interface ListaUsuarioDTO {
    id: string,
    email: string,
    nome_completo: string,
  }