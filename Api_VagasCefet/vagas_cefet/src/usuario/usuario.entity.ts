import { VagaEntity } from 'src/vagas/vaga.entity';
import {Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm'

@Entity({name: 'usuarios'})
export class UsuarioEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'nome_completo', length: 100, nullable: false})
    nome_completo: string;

    @Column({name: 'role', length: 10, nullable: false})
    role: string;
    
    @Column({name: 'email', length: 70, nullable: false})
    email: string;
    
    @Column({name: 'senha', length: 255, nullable: false})
    senha: string;

    @Column({name: 'apelido', length: 20, nullable: false})
    apelido: string;

    @Column('varchar', {name: 'resumo', length: 500, nullable: true})
    resumo: string;

    @Column('varchar', {name: 'formacao', length: 1000, nullable: true})
    formacao: string;

    @Column('varchar', {name: 'exp_profissional', length: 1000, nullable: true})
    exp_profissional: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;

    @OneToMany(() => VagaEntity, (vaga) => vaga.usuario)
    vaga: VagaEntity[];
}