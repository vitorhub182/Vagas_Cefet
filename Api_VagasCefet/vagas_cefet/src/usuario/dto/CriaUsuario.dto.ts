import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/emailUnico.validator";
import { ValidRole } from "../validacao/tipoRole.validator";

export class CriaUsuarioDTO {
    
    @IsNotEmpty({message: "Campo 'nome_completo' não pode ser vazio"})
    nome_completo: string;
    
    @IsEmail(undefined, {message: "O 'email' informado é inválido"})
    @IsNotEmpty({message: "Campo 'email' não pode ser vazio"})
    @EmailEhUnico({message: 'E-mail já registrado'}) 
    email: string;
    
    @MinLength(6, {message: "A 'senha' precisa ter pelo menos 6 caracteres"})
    @IsNotEmpty({message: "Campo 'senha' não pode ser vazio"})
    senha: string;

    @ValidRole({message: "Tipo inválido: aceito apenas 'professor' ou 'aluno'"})
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