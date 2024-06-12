import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { v4 as uuid } from 'uuid';
import { UsuarioEntity } from "./usuario.entity";

@Controller('/usuarios')
export class UsuarioController{
    
    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.id = uuid();
        
        this.usuarioRepository.salvar(usuarioEntity);
        return {id: usuarioEntity.id, message: 'Usuario criado com sucesso!'};
    }


    @Get()
    async listaUsuarios(){
        return this.usuarioRepository.listar();
    }

}