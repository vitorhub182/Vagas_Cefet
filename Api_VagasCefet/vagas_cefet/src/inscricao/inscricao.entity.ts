import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { VagaEntity } from 'src/vaga/vaga.entity';
import {Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, IntegerType, TableForeignKey, ManyToOne, JoinColumn, ManyToMany} from 'typeorm'

@Entity({name: 'inscricoes'})
export class InscricaoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 20 })
    status: string;
  
    @Column({ type: 'boolean', default: false })
    visto: boolean;

    @Column()
    public vagaId: string

    @Column()
    public alunoId: string
  
    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.inscricoes)
    @JoinColumn({name: 'alunoId'})
    public usuario: UsuarioEntity;
  
    @ManyToOne(() => VagaEntity, (vaga) => vaga.inscricoes)
    public vaga: VagaEntity;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: string;
}