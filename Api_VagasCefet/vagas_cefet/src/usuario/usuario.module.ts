import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";


import { UsuarioController } from "./usuario.controller";
//import { UsuarioRepository } from "./usuario.repository";
import { EmailEhUnicoValidator } from "./validacao/emailUnico.validator";
import { UsuarioService } from "./usuario.service";
import { UsuarioEntity } from "./usuario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers:[
        UsuarioService,
//        UsuarioRepository, 
        EmailEhUnicoValidator // adicionando o provider de Validação de email
    ] 
})

export class UsuarioModule {}