import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { UsuarioService } from "./usuario.service";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RolesGuard } from "src/auth/roles.guard";

@Controller('/usuarios')

export class UsuarioController{
    
    constructor(
        private usuarioService: UsuarioService
    ) {}

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
   
        const usuarioSalvo = await this.usuarioService.salvar(dadosDoUsuario);
        return {usuario: new ListaUsuarioDTO(usuarioSalvo.id, usuarioSalvo.nome, usuarioSalvo.role),
             message: 'Usuario criado com sucesso!'};
    }

    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.Professor)
    async listaUsuarios(){
        const usuariosLista = await this.usuarioService.listaUsuarios();
        return usuariosLista;
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    @Roles(Role.Professor, Role.Aluno)
    async buscaPorId(@Param('id') id: string){
        const usuario = await this.usuarioService.buscaPorId(id);
        return usuario;
    }

    @Patch('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Professor,Role.Aluno)
    async atualizaUsuario( @Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO){
        const usuarioAtualizado = await this.usuarioService.atualiza(id,novosDados);
        return {
            usuario: new ListaUsuarioDTO(usuarioAtualizado.id, usuarioAtualizado.nome,usuarioAtualizado.role),
            message: 'Usuario atualizado com Sucesso'
        }
    }

    @Delete('/:id')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Professor,Role.Aluno)
    async removeUsuario(@Param('id') id: string){
        const usuarioRemovido = await this.usuarioService.remover(id);
        return{
            usuario: new ListaUsuarioDTO(usuarioRemovido.id,usuarioRemovido.nome,usuarioRemovido.role),
            message: 'Usuario Removido com Sucesso'
        }
    }
}