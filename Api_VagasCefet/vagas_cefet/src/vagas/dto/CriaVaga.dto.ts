import {IsNotEmpty, IsOptional} from "class-validator";


export class CriaVagaDTO {
    
    @IsNotEmpty({message: "Campo 'titulo' não pode ser vazio"})
    titulo: string;
    
    @IsNotEmpty({message: "Campo 'contratante' não pode ser vazio"})
    contratante: string;
    
    @IsNotEmpty({message: "Campo 'tipo' não pode ser vazio"})
    tipo: string;

    @IsNotEmpty({message: "Campo 'requisitos' não pode ser vazio"})
    requisitos: string;

    @IsOptional()
    detalhes: string;

    @IsNotEmpty({message: "Campo 'status' não pode ser vazio"})
    status: number;

}