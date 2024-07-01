import { InscricaoEntity } from 'src/inscricao/inscricao.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import {Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, IntegerType, TableForeignKey, ManyToOne, JoinColumn, OneToMany} from 'typeorm'

@Entity({name: 'vagas'})
export class VagaEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'titulo', length: 100, nullable: false})
    titulo: string;

    @Column({name: 'contratante', length: 100, nullable: false})
    contratante: string;
    
    @Column({name: 'tipo', length: 70, nullable: false})
    tipo: string;

    @Column('varchar', {name: 'requisitos', length: 500, nullable: false})
    requisitos: string;
    
    @Column('varchar', {name: 'detalhes', length: 1000, nullable: true})
    detalhes: string;

    @Column({name: 'status', nullable: false})
    status: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;

    @Column()
    professorId: string;
    
    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.vaga)
    @JoinColumn({name: "professorId"})
    usuario:UsuarioEntity;

    @OneToMany(() => InscricaoEntity, (inscricao) => inscricao.vaga)
    inscricoes: InscricaoEntity[];

}