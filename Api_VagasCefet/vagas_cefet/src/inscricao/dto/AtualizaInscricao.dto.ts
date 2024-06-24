import { IsNotEmpty, IsOptional} from "class-validator";
import { UsuarioEntity } from "src/usuario/usuario.entity";

export class AtualizaInscricaoDTO {

    @IsOptional()
    @IsNotEmpty({message: "Campo 'status' não pode ser vazio"})
    status: string;
    
    @IsOptional()
    @IsNotEmpty({message: "Campo 'visto' não pode ser vazio"})
    visto: boolean;
}