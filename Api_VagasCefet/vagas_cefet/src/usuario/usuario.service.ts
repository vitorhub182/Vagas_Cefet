import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";

@Injectable()
export class UsuarioService{
    constructor(
    @InjectRepository(UsuarioEntity) // alinhar repository ao entity
    private readonly usuarioRepository: Repository<UsuarioEntity>
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
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDTO(usuario.id,usuario.nome) 
        )
        return usuariosLista;
    }

    async salvar(dadosUsuarios: UsuarioEntity){
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

}