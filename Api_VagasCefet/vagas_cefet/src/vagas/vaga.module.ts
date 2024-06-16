import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VagaController } from "./vaga.controller";
import { VagaService } from "./vaga.service";
import { VagaEntity } from "./vaga.entity";
import { AuthModule } from "src/auth/auth.module";
import { JwtService } from "@nestjs/jwt";



@Module({
    imports: [
        TypeOrmModule.forFeature([VagaEntity]),
        forwardRef(() => AuthModule),
        
    ],
    controllers: [VagaController],
    providers:[
        VagaService,
        JwtService,
    ],
    exports: [TypeOrmModule],
    
})

export class VagaModule {}