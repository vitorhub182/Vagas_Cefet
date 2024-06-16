import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/emailUnico.validator";
import { ValidRole } from "../validacao/tipoRole.validator";

export class CriaUsuarioDTO {
    
    @IsNotEmpty({message: "Campo NOME não pode ser vazio"})
    nome: string;
    @IsEmail(undefined, {message: "O EMAIL informado é inválido"})
    @EmailEhUnico({message: 'E-mail já registrado'}) 
    email: string;
    @MinLength(6, {message: "A SENHA precisa ter pelo menos 6 caracteres"})
    senha: string;

    @ValidRole({message: "Tipo inválido"})
    role: string;
}