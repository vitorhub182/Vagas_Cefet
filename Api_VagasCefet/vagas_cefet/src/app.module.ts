import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { VagaModule } from './vaga/vaga.module';
import { InscricaoModule } from './inscricao/inscricao.module';


@Module({
  imports: [
    UsuarioModule,
    VagaModule,
    InscricaoModule,

    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    AuthModule
  ],
  providers: []
})
export class AppModule {}
