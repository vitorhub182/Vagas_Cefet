import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioController } from "./usuario.controller";
import { EmailEhUnicoValidator } from "./validacao/emailUnico.validator";
import { UsuarioService } from "./usuario.service";
import { UsuarioEntity } from "./usuario.entity";
import { AuthModule } from "src/auth/auth.module";
import { JwtService } from "@nestjs/jwt";



@Module({
    imports: [
        TypeOrmModule.forFeature([UsuarioEntity]),
        forwardRef(() => AuthModule),
        
    ],
    controllers: [UsuarioController],
    providers:[
        UsuarioService,
        EmailEhUnicoValidator, // adicionando o provider de Validação de email
        JwtService,
    ],
    exports: [TypeOrmModule],
    
})

export class UsuarioModule {}