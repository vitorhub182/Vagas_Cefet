import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/emailUnico.validator";

export class AtualizaUsuarioDTO {
    
    @IsNotEmpty({message: "Campo NOME não pode ser vazio"})
    @IsOptional()
    nome: string;

    @IsEmail(undefined, {message: "O EMAIL informado é inválido"})
    @IsOptional()
    @EmailEhUnico({message: 'E-mail já registrado'})
    email: string;
    
    @MinLength(6, {message: "A SENHA precisa ter pelo menos 6 caracteres"})
    @IsOptional()
    senha: string;
}