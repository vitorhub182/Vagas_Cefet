import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    UsuarioModule,

    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRootAsync({
      useClass: PostresConfigService,
      inject: [PostresConfigService]
    })
    
  ],
})
export class AppModule {}
