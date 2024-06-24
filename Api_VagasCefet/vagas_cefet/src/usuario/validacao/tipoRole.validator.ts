import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Injectable } from "@nestjs/common";
import { UsuarioService } from "../usuario.service";
import { Role } from "src/enums/role.enum";


@Injectable() // providers
@ValidatorConstraint({async: true }) // Configura com uma classe de validação assíncrona
export class TipoRoleValidator implements ValidatorConstraintInterface{ // implementando a interface que define a classe com validador
    
    
    async validate(value: any, validationArguments?: ValidationArguments):  Promise<boolean> {
        if((value === Role.Aluno) || (value === Role.Professor)){
            return true;
        }else {
            return false;
        }
    }

}

// Cria o decorator que sera utilizado como validador assíncrono 
export const ValidRole = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: TipoRoleValidator
        })
    }
}