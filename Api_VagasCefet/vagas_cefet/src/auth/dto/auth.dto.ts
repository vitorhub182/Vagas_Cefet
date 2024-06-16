import { IsEmail, MinLength } from "class-validator";

export class loginDTO {
    
    @IsEmail(undefined, {message: "O EMAIL informado é inválido"})
    email: string;
    @MinLength(6, {message: "Senha muito curta"})
    senha: string;
}