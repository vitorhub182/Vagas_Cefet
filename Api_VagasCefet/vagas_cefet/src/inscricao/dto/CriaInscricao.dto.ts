import {IsNotEmpty, IsOptional} from "class-validator";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { VagaEntity } from "src/vaga/vaga.entity";


export class CriaInscricaoDTO {

    @IsOptional()
    @IsNotEmpty({message: "Campo 'status' não pode ser vazio"})
    status: number;
    
    @IsOptional()
    @IsNotEmpty({message: "Campo 'visto' não pode ser vazio"})
    visto: boolean;

    @IsNotEmpty({message: "Campo 'usuarioId' não pode ser vazio"})
    alunoId: string

    @IsNotEmpty({message: "Campo 'vagaId' não pode ser vazio"})
    vagaId: string
}