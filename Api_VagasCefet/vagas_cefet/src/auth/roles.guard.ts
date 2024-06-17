import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    //private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(UsuarioEntity) // alinhar repository ao entity
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //const roles = this.reflector.get<string[]>('roles', context.getHandler());
    //if (!roles) {
    //  return true;
    //}

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const userId = request.params.id;
         
    if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.get<string>('SECRET')
          }
        );
        request['user'] = payload;

        const emailJWT = payload.emailFornecido;

        const user = await this.usuarioRepository.findOne({where: {email: emailJWT}})
        if (user.id !== userId) {
            throw new UnauthorizedException('You can only delete your own account');
          }
          return true
        // Verifica se o usuário tem uma das roles necessárias
        //return roles.some(role => user.role?.includes(role));
    }
    catch {
        throw new UnauthorizedException();
      }
  }
    
private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
