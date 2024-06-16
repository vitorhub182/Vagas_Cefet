import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaVagaDTO } from "./dto/ListaVaga.dto";
import { VagaEntity } from "./vaga.entity";
import { Repository } from "typeorm";
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { ConfigService } from "@nestjs/config";
import { CriaVagaDTO } from "./dto/CriaVaga.dto";
import { DescricaoVagaDTO } from "./dto/DescricaoVaga.dto";

@Injectable()
export class VagaService{
    constructor(
    @InjectRepository(VagaEntity) // alinhar repository ao entity
    private readonly vagaRepository: Repository<VagaEntity>,
    private configService: ConfigService
    ){}


    async buscaPorId(vagaid: string){

        try{
            const possivelVaga = await this.vagaRepository.findOne({
                where: { id: vagaid}
            });
            if(!possivelVaga){
                throw new Error('Vaga não existe');
            }
            return possivelVaga;

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao buscar id do vaga');
        }
    }

    async listaVagas(){

        try{
            const listaDeVagas = await this.vagaRepository.find();
            
            //const teste = await this.vagaRepository.createQueryBuilder('vagas').select(['vagas.id']).getMany();
           
            return listaDeVagas;

        } catch (error) {
            if (error instanceof NotFoundException) {
              throw error;
            }
            throw new InternalServerErrorException('Erro ao listar vagas');
        }
    }

    async salvar(dadosVaga: CriaVagaDTO){

        try{
            const vagaEntity = new VagaEntity();
            vagaEntity.email = dadosVaga.email;
            vagaEntity.nome_completo = dadosVaga.nome_completo;
            vagaEntity.senha = dadosVaga.senha;
            vagaEntity.role = dadosVaga.role;
            vagaEntity.apelido = dadosVaga.apelido;
            vagaEntity.resumo = dadosVaga.resumo;
            vagaEntity.formacao = dadosVaga.formacao;
            vagaEntity.exp_profissional = dadosVaga.exp_profissional;
            
            const password = this.configService.get<string>('ENCRIPT');
            const iv = randomBytes(16);
            const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
            const cipher = createCipheriv('aes-256-ctr', key, iv);
            const senhaEncrypted = Buffer.concat([cipher.update(dadosVaga.senha),cipher.final(),]);
            const ivBase64 = iv.toString('base64');
            const encryptedBase64 = senhaEncrypted.toString('base64');
            dadosVaga.senha = `${ivBase64}:${encryptedBase64}`; 

            const vagaSalva = await this.vagaRepository.save(dadosVaga);
    
            return vagaSalva;

        } catch (error) {
            if (error instanceof NotFoundException) {
              throw error;
            }
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
            throw new InternalServerErrorException('Erro ao remover a vaga');
        }
    }
    
    async findOne(emailFornecido: string): Promise<VagaEntity | undefined> {
        try {
            return this.vagaRepository.findOne({
                where: { email: emailFornecido}
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao buscar vaga via FindOne');
        }
    }
}