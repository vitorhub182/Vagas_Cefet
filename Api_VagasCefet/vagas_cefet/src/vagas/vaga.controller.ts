import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
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

    @Post()
    async criaVaga(@Body() dadosDaVaga: CriaVagaDTO) {   
        const vagaSalva = await this.vagaService.salvar(dadosDaVaga);
        return {
            vaga: new DescricaoVagaDTO(vagaSalva),
            message: "Vaga salva com sucesso!"
        }
    }

    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.Professor)
    async listaVagas(){
        const vagasLista = await this.vagaService.listaVagas();
    
        const vagasListaDTO = vagasLista.map(
            vaga => new ListaVagaDTO(vaga)
        )

        return { 
            listaDeVagas: vagasListaDTO,
            message: "Lista de vagas apresentada com Sucesso!"
        }
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    @Roles(Role.Professor, Role.Aluno)
    async buscaPorId(@Param('id') id: string){
        const vaga = await this.vagaService.buscaPorId(id);
        
        return {
            vaga: new DescricaoVagaDTO(vaga),
            message: "Vaga apresentada com Sucesso!"
        };
    }

    @Patch('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Professor,Role.Aluno)
    async atualizaVaga( @Param('id') id: string, @Body() novosDados: AtualizaVagaDTO){
        const vagaAtualizado = await this.vagaService.atualiza(id,novosDados);
        return {
            vaga: new DescricaoVagaDTO(vagaAtualizado),
            message: 'Vaga atualizada com Sucesso!'
        }
    }

    @Delete('/:id')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Professor,Role.Aluno)
    async removeVaga(@Param('id') id: string){
        const vagaRemovido = await this.vagaService.remover(id);
        return{
            vaga: new DescricaoVagaDTO(vagaRemovido),
            message: 'Vaga Removida com Sucesso!'
        }
    }
}