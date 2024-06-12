import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailEhUnicoValidator } from "./validacao/emailUnico.validator";

@Module({
    controllers: [UsuarioController],
    providers:[UsuarioRepository, EmailEhUnicoValidator] // adicionando o provider de Validação de email
})

export class UsuarioModule {}