import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { v4 as uuid } from 'uuid';
import { UsuarioEntity } from "./usuario.entity";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { UsuarioService } from "./usuario.service";

@Controller('/usuarios')
export class UsuarioController{
    
    constructor(
        private usuarioRepository: UsuarioRepository,
        private usuarioService: UsuarioService
    ) {}

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.id = uuid();
        
        this.usuarioRepository.salvar(usuarioEntity);
        return {usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome), 
             message: 'Usuario criado com sucesso!'};
    }


    @Get()
    async listaUsuarios(){
        const usuariosLista = await this.usuarioService.listaUsuarios();
        return usuariosLista;
    }

    @Put('/:id')
    async atualizaUsuario( @Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO){
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id,novosDados);
        return {
            usuario: new ListaUsuarioDTO(usuarioAtualizado.id, usuarioAtualizado.nome),
            message: 'Usuario atualizado com Sucesso'
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string){
        const usuarioRemovido = await this.usuarioRepository.remover(id);
        return{
            usuario: new ListaUsuarioDTO(usuarioRemovido.id,usuarioRemovido.nome),
            message: 'Usuario Removido com Sucesso'
        }
    }

}