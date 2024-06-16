import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export class CriaVagaDTO {
    
    @IsNotEmpty({message: "Campo 'nome_completo' não pode ser vazio"})
    nome_completo: string;
    
    @IsEmail(undefined, {message: "O 'email' informado é inválido"})
    @IsNotEmpty({message: "Campo 'email' não pode ser vazio"})
    email: string;
    
    @MinLength(6, {message: "A 'senha' precisa ter pelo menos 6 caracteres"})
    @IsNotEmpty({message: "Campo 'senha' não pode ser vazio"})
    senha: string;

    @IsNotEmpty({message: "Campo 'role' não pode ser vazio"})
    role: string;

    @IsNotEmpty({message: "Campo 'apelido' não pode ser vazio"})
    apelido: string;

    @IsOptional()
    resumo: string;

    @IsOptional()
    exp_profissional: string;

    @IsOptional()
    formacao: string;
}