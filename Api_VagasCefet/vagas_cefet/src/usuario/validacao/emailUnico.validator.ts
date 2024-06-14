import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioController } from "../usuario.controller";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";


@Injectable() // providers
@ValidatorConstraint({async: true }) // Configura com uma classe de validação assíncrona
export class EmailEhUnicoValidator implements ValidatorConstraintInterface{ // implementando a interface que define a classe com validador
    
    constructor(private usuarioRepository: UsuarioRepository ) {}

    async validate(value: any, validationArguments?: ValidationArguments):  Promise<boolean> {
        const usuarioEmail = await this.usuarioRepository.existeEmail(value);
        return !usuarioEmail;
    }

}



// Cria o decorator que sera utilizado como validador assíncrono 
export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidator
        })
    }
}