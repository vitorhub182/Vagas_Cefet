import {IsNotEmpty, IsOptional} from "class-validator";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { VagaEntity } from "src/vaga/vaga.entity";


export class CriaInscricaoDTO {

    @IsOptional()
    @IsNotEmpty({message: "Campo 'status' não pode ser vazio"})
    status: string;
    
    @IsOptional()
    @IsNotEmpty({message: "Campo 'visto' não pode ser vazio"})
    visto: boolean;

    @IsOptional()
    usuario: UsuarioEntity

    @IsOptional()
    vaga: VagaEntity
}