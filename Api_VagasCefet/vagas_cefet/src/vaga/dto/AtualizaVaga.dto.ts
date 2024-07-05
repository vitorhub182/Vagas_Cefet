import { IsNotEmpty, IsOptional } from "class-validator";
import { UsuarioEntity } from "src/usuario/usuario.entity";


export class AtualizaVagaDTO {

    @IsOptional()
    @IsNotEmpty({message: "Campo 'titulo' não pode ser vazio"})
    titulo: string;
    
    @IsOptional()
    @IsNotEmpty({message: "Campo 'contratante' não pode ser vazio"})
    contratante: string;
    
    @IsOptional()
    @IsNotEmpty({message: "Campo 'tipo' não pode ser vazio"})
    tipo: string;

    @IsOptional()
    @IsNotEmpty({message: "Campo 'requisitos' não pode ser vazio"})
    requisitos: string;

    @IsOptional()
    detalhes: string;

    @IsOptional()
    @IsNotEmpty({message: "Campo 'status' não pode ser vazio"})
    status: number;

    @IsOptional()
    @IsNotEmpty({message: "Campo 'professorId' não pode ser vazio"})
    professorId: string;

}