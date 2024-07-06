import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InscricaoEntity } from "./inscricao.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { TranslateJWT } from "src/jwtTranslate/jwtTranslateToId";
import { VagaEntity } from "src/vaga/vaga.entity";
import { CriaInscricaoDTO } from "./dto/CriaInscricao.dto";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { ListaInscricoesDTO } from "./dto/ListaInscricoes.dto";

@Injectable()
export class InscricaoService{
    constructor(
    @InjectRepository(InscricaoEntity) // alinhar repository ao entity
    private readonly inscricaoRepository: Repository<InscricaoEntity>,
    @InjectRepository(VagaEntity) // alinhar repository ao entity
    private readonly vagaRepository: Repository<VagaEntity>,
    @InjectRepository(UsuarioEntity) // alinhar repository ao entity
    private readonly usuarioRepository: Repository<UsuarioEntity>,

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

    async listaInscricoes(){

        try{
            //const listaDeInscricoes = await this.inscricaoRepository.find();
            
            const listaDeInscricoes = await this.inscricaoRepository.createQueryBuilder('inscricoes').
            innerJoinAndSelect('inscricoes.usuario', 'usuarios')
            .innerJoinAndSelect('inscricoes.vaga', 'vagas')
            .select([
                'inscricoes.id',
                'inscricoes.status',
                'inscricoes.visto',
                'inscricoes.vagaId',
                'inscricoes.alunoId',
                'inscricoes.createdAt',
                'inscricoes.updatedAt',
                'inscricoes.deletedAt',
                'usuarios.nome_completo',
                'vagas.titulo',
            ])
            .getMany();
            console.log(listaDeInscricoes);
            return listaDeInscricoes;

        } catch (error) {
            if (error instanceof NotFoundException) {
              throw error;
            }
            console.log(error);
            throw new InternalServerErrorException('Erro ao listar inscricoes');
        }
    }

    async salvar(dadosInscricao: CriaInscricaoDTO){
        try{
            const aluno = await this.usuarioRepository.findOne({where: {id: dadosInscricao.alunoId}})
            const vaga =  await this.vagaRepository.findOne({where: {id: dadosInscricao.vagaId}})

            const inscricao = await this.inscricaoRepository.findOne({ where: {
                alunoId: dadosInscricao.alunoId,
                vagaId: dadosInscricao.vagaId,
            }
            })
            if (!vaga || !aluno){ throw new NotFoundException }
            console.log(inscricao)
            if (inscricao !== null ) { return null}

            const inscricaoNova = new InscricaoEntity;

            inscricaoNova.status = 0;
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