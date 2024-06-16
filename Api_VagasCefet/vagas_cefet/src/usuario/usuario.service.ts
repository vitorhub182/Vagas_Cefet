import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsuarioService{
    constructor(
    @InjectRepository(UsuarioEntity) // alinhar repository ao entity
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    private configService: ConfigService
    ){}
    private async buscaPorId(usuarioid: string){
        const possivelUsuario = await this.usuarioRepository.findOne({
            where: { id: usuarioid}
        });
        if(!possivelUsuario){
            throw new Error('Usuario não existe');
        }
        return possivelUsuario;
    }


    async listaUsuarios(){
        const usuariosSalvos = await this.usuarioRepository.find();
        /*
        const teste = await this.usuarioRepository.createQueryBuilder('usuarios').select(['usuarios.id']).getMany();
        console.log(teste);
        */
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDTO(usuario.id,usuario.nome) 
        )
        return usuariosLista;
    }

    async salvar(dadosUsuarios: UsuarioEntity){
        const password = this.configService.get<string>('ENCRIPT');
        const iv = randomBytes(16);
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);
        const senhaEncrypted = Buffer.concat([cipher.update(dadosUsuarios.senha),cipher.final(),]);
        const ivBase64 = iv.toString('base64');
        const encryptedBase64 = senhaEncrypted.toString('base64');
        dadosUsuarios.senha = `${ivBase64}:${encryptedBase64}`; 

        const usuarioSalvo = await this.usuarioRepository.save(dadosUsuarios);
        return usuarioSalvo;
    }

    async existeEmail(emailFornecido:string){
        const possivelUsuario = await this.usuarioRepository.find({
            where: { email: emailFornecido }
        });
        return possivelUsuario.length === 0;
    }

    async atualiza(id:string, dadosDeAtualizacao: Partial<UsuarioEntity> /*Recebo parcialmente o usuarioEntity*/)
    {
        await  this.buscaPorId(id);

        await this.usuarioRepository.update(id, { 
            nome: dadosDeAtualizacao.nome,
            email: dadosDeAtualizacao.email,
            senha: dadosDeAtualizacao.senha
         });
        return this.buscaPorId(id);

    }
    
    async remover(usuarioId:string){
        const possivelUsuario = await this.buscaPorId(usuarioId);

        await this.usuarioRepository.softDelete(usuarioId);
        return possivelUsuario;
    }
    
    async findOne(emailFornecido: string): Promise<UsuarioEntity | undefined> {
        return this.usuarioRepository.findOne({
            where: { email: emailFornecido}
        });
    }

}