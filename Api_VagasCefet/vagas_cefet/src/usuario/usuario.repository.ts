import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];
    
    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }

    async listar(){
        return this.usuarios;
    }

    // função para verificar se o email já existe na lista
    async existeEmail(email:string){
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );
        return possivelUsuario !== undefined;
    }
}