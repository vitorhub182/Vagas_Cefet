import { Body, Controller, Get, Headers, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ListaInscricoesDTO } from "./dto/ListaInscricoes.dto";
import { AtualizaInscricaoDTO } from "./dto/AtualizaInscricao.dto";
import { InscricaoService } from "./inscricao.service";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { DescricaoInscricaoDTO } from "./dto/DescricaoInscricao.dto";
import { CriaInscricaoDTO } from "./dto/CriaInscricao.dto";

@Controller('/inscricoes')

export class InscricaoController{
    
    constructor(
        private inscricaoService: InscricaoService
    ) {}

    @UseGuards(AuthGuard)
    @Roles(Role.Aluno)
    @Post('/')
    async criaInscricao(@Body() dadosInscricao: CriaInscricaoDTO) {

        const inscricaoSalva = await this.inscricaoService.salvar(dadosInscricao);
        return new DescricaoInscricaoDTO(inscricaoSalva)
    }

    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.Professor, Role.Aluno)
    async listaInscricaos(){
        const inscricoesLista = await this.inscricaoService.listaInscricoes();
        
        const inscricoesListaDTO = inscricoesLista.map(
            inscricao => new ListaInscricoesDTO(inscricao)
        )
        return inscricoesListaDTO
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