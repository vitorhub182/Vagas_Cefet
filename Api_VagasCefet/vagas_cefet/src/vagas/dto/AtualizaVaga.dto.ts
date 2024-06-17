import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { IntegerType } from "typeorm";

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
}