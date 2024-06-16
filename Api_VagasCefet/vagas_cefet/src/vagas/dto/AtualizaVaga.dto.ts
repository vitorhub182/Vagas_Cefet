import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class AtualizaVagaDTO {

    @IsNotEmpty({message: "Campo 'role' não pode ser vazio"})
    @IsOptional()
    role: string;

    @IsNotEmpty({message: "Campo 'nome_completo' não pode ser vazio"})
    @IsOptional()
    nome_completo: string;

    @IsEmail(undefined, {message: "O 'email' informado é inválido"})
    @IsNotEmpty({message: "Campo 'email' não pode ser vazio"})
    @IsOptional()
    email: string;
    @IsNotEmpty({message: "Campo 'senha' não pode ser vazio"})
    @MinLength(6, {message: "A 'senha' precisa ter pelo menos 6 caracteres"})
    @IsOptional()
    senha: string;

    @IsNotEmpty({message: "Campo 'apelido' não pode ser vazio"})
    @IsOptional()
    apelido: string;

    @IsOptional()
    resumo: string;

    @IsOptional()
    exp_profissional: string;

    @IsOptional()
    formacao: string;
}