import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InscricaoEntity } from "./inscricao.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { TranslateJWT } from "src/jwtTranslate/jwtTranslateToId";
import { VagaEntity } from "src/vaga/vaga.entity";

@Injectable()
export class InscricaoService{
    constructor(
    @InjectRepository(InscricaoEntity) // alinhar repository ao entity
    private readonly inscricaoRepository: Repository<InscricaoEntity>,
    @InjectRepository(VagaEntity) // alinhar repository ao entity
    private readonly vagaRepository: Repository<VagaEntity>,

    private jwtTranslate: TranslateJWT,
    private configService: ConfigService
    ){}

    async buscaPorId(inscricaoid: string){

        try{
            const possivelInscricao = await this.inscricaoRepository.findOne({
                where: { id: inscricaoid}
            });
            if(!possivelInscricao){
                throw new NotFoundException('Inscricao não existe');
            }
            return possivelInscricao;

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.log(error);
            throw new InternalServerErrorException('Erro ao buscar id da inscricao');
        }
    }

    async listaInscricaos(){

        try{
            const listaDeInscricaos = await this.inscricaoRepository.find();
            
            //const teste = await this.inscricaoRepository.createQueryBuilder('inscricaos').select(['inscricaos.id']).getMany();*/
           
            return listaDeInscricaos;

        } catch (error) {
            if (error instanceof NotFoundException) {
              throw error;
            }
            console.log(error);
            throw new InternalServerErrorException('Erro ao listar inscricaos');
        }
    }

    async salvar(authHeader: string,vagaId: string){
        try{
            const aluno = await this.jwtTranslate.translateJWT(authHeader);
            const vaga = await this.vagaRepository.findOne({
                where: { id: vagaId}
            });
            if (!vaga){ throw new NotFoundException }

            const inscricaoNova = new InscricaoEntity;

            inscricaoNova.status = "em avaliação";
            inscricaoNova.visto = false;
            inscricaoNova.vaga = vaga;
            inscricaoNova.usuario = aluno;


            const inscricaoSalva = await this.inscricaoRepository.save(inscricaoNova);
            return inscricaoSalva;

        } catch (error) {
            if (error instanceof NotFoundException) {
              throw error;
            }
            console.log(error);
            throw new InternalServerErrorException('Erro ao salvar a inscricao');
        }
    }

    async atualiza(id:string, dadosDeAtualizacao: Partial<InscricaoEntity> /*Recebo parcialmente o inscricaoEntity*/){

        try {
            await  this.buscaPorId(id);

            await this.inscricaoRepository.update(id, dadosDeAtualizacao);
            return this.buscaPorId(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
              throw error;
            }
            console.log(error);
            throw new InternalServerErrorException('Erro ao atualizar a inscricao');
        }
    }
}