import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InscricaoEntity } from "./inscricao.entity";
import { AuthModule } from "src/auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { UsuarioModule } from "src/usuario/usuario.module";
import { TranslateJWT } from "src/jwtTranslate/jwtTranslateToId";
import { InscricaoService } from "./inscricao.service";
import { InscricaoController } from "./inscricao.controller";
import { VagaModule } from "src/vaga/vaga.module";

@Module({
    imports: [
        UsuarioModule,
        VagaModule,
        TypeOrmModule.forFeature([InscricaoEntity]),
        forwardRef(() => AuthModule),
        
    ],
    controllers: [InscricaoController],
    providers:[
        InscricaoService,
        JwtService,
        TranslateJWT,
        
    ],
    exports: [TypeOrmModule],
    
})

export class InscricaoModule {}