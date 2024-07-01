import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CriaVagaDTO } from "./dto/CriaVaga.dto";
import { ListaVagaDTO } from "./dto/ListaVaga.dto";
import { AtualizaVagaDTO } from "./dto/AtualizaVaga.dto";
import { VagaService } from "./vaga.service";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RolesGuard } from "src/auth/roles.guard";
import { DescricaoVagaDTO } from "./dto/DescricaoVaga.dto";

@Controller('/vagas')

export class VagaController{
    
    constructor(
        private vagaService: VagaService
    ) {}

    @UseGuards(AuthGuard)
    @Roles(Role.Professor)
    @Post()
    async criaVaga(@Headers('authorization') authHeader: string,@Body() dadosDaVaga: CriaVagaDTO) {

        const vagaSalva = await this.vagaService.salvar(dadosDaVaga,authHeader,);
        return new DescricaoVagaDTO(vagaSalva)
    }

    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.Professor, Role.Aluno)
    async listaVagas(){
        const vagasLista = await this.vagaService.listaVagas();
        const vagasListaDTO = vagasLista.map(
            vaga => new ListaVagaDTO(vaga)
        )
        return  vagasListaDTO
    }


    @Get('/:id')
    @UseGuards(AuthGuard)
    @Roles(Role.Professor, Role.Aluno)
    async buscaPorId(@Param('id') id: string){
        const vaga = await this.vagaService.buscaPorId(id);
        
        return new DescricaoVagaDTO(vaga)
 
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    @Roles(Role.Professor)
    async atualizaVaga( @Param('id') id: string, @Body() novosDados: AtualizaVagaDTO){
        const vagaAtualizado = await this.vagaService.atualiza(id,novosDados);
        
        return  new DescricaoVagaDTO(vagaAtualizado)       
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @Roles(Role.Professor)
    async removeVaga(@Param('id') id: string){
        const vagaRemovido = await this.vagaService.remover(id);
        return new DescricaoVagaDTO(vagaRemovido)
 
    }
}