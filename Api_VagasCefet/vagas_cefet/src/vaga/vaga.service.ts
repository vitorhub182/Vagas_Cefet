import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VagaEntity } from "./vaga.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { CriaVagaDTO } from "./dto/CriaVaga.dto";
import { TranslateJWT } from "src/jwtTranslate/jwtTranslateToId";

@Injectable()
export class VagaService{
    constructor(
    @InjectRepository(VagaEntity) // alinhar repository ao entity
    private readonly vagaRepository: Repository<VagaEntity>,
    private jwtTranslate: TranslateJWT,
    private configService: ConfigService
    ){}


    async buscaPorId(vagaid: string){

        try{
            const possivelVaga = await this.vagaRepository.findOne({
                where: { id: vagaid}
            });
            if(!possivelVaga){
                throw new NotFoundException('Vaga não existe');
            }
            return possivelVaga;

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.log(error);
            throw new InternalServerErrorException('Erro ao buscar id da vaga');
        }
    }

    async listaVagas(){

        try{
            const listaDeVagas = await this.vagaRepository.find();
            
            //const teste = await this.vagaRepository.createQueryBuilder('vagas').select(['vagas.id']).getMany();*/
           
            return listaDeVagas;

        } catch (error) {
            if (error instanceof NotFoundException) {
              throw error;
            }
            console.log(error);
            throw new InternalServerErrorException('Erro ao listar vagas');
        }
    }

    async salvar(dadosVaga: CriaVagaDTO, authHeader: string){

        try{
            dadosVaga.usuario = await this.jwtTranslate.translateJWT(authHeader)
            const vagaSalva = await this.vagaRepository.save(dadosVaga);
            return vagaSalva;

        } catch (error) {
            if (error instanceof NotFoundException) {
              throw error;
            }
            console.log(error);
            throw new InternalServerErrorException('Erro ao salvar a vaga');
        }
    }

    async atualiza(id:string, dadosDeAtualizacao: Partial<VagaEntity> /*Recebo parcialmente o vagaEntity*/){

        try {
            await  this.buscaPorId(id);

            await this.vagaRepository.update(id, dadosDeAtualizacao);
            return this.buscaPorId(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
              throw error;
            }
            console.log(error);
            throw new InternalServerErrorException('Erro ao atualizar a vaga');
        }
    }
    
    async remover(vagaId:string){

        try{
            const possivelVaga = await this.buscaPorId(vagaId);

            await this.vagaRepository.softDelete(vagaId);
            return possivelVaga;
        } catch (error) {
            if (error instanceof NotFoundException) {
              throw error;
            }
            console.log(error);
            throw new InternalServerErrorException('Erro ao remover a vaga');
        }
    }
}