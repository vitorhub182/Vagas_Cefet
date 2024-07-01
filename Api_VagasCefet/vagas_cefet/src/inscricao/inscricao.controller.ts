import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ListaInscricoesDTO } from "./dto/ListaInscricoes.dto";
import { AtualizaInscricaoDTO } from "./dto/AtualizaInscricao.dto";
import { InscricaoService } from "./inscricao.service";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { DescricaoInscricaoDTO } from "./dto/DescricaoInscricao.dto";

@Controller('/inscricoes')

export class InscricaoController{
    
    constructor(
        private inscricaoService: InscricaoService
    ) {}

    @UseGuards(AuthGuard)
    @Roles(Role.Aluno)
    @Post('/:id')
    async criaInscricao(@Headers('authorization') authHeader: string,@Param('id') vagaId: string) {

        const inscricaoSalva = await this.inscricaoService.salvar(authHeader, vagaId);
        return new DescricaoInscricaoDTO(inscricaoSalva)
    }

    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.Professor)
    async listaInscricaos(){
        const inscricaosLista = await this.inscricaoService.listaInscricaos();
        const inscricaosListaDTO = inscricaosLista.map(
            inscricao => new ListaInscricoesDTO(inscricao)
        )
        return inscricaosListaDTO
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    @Roles(Role.Professor, Role.Aluno)
    async buscaPorId(@Param('id') id: string){
        const inscricao = await this.inscricaoService.buscaPorId(id);
        
        return new DescricaoInscricaoDTO(inscricao)
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    @Roles(Role.Professor)
    async atualizaInscricao( @Param('id') id: string, @Body() novosDados: AtualizaInscricaoDTO){
        const inscricaoAtualizado = await this.inscricaoService.atualiza(id,novosDados);
        return  new DescricaoInscricaoDTO(inscricaoAtualizado)
    }
}