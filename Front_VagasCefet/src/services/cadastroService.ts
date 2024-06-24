import { CriaUsuarioDTO } from "@/dto/cadastroUsuario";
import { useRouter } from "next/router";

export async function cadastroUsuario(dadosUsuario: CriaUsuarioDTO) {

    const response = await fetch('http://localhost:3002/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosUsuario),
    });
  
    if (!response.ok) {
        console.log("TESTE_CADASTRO")
      throw new Error('Falha ao registrar usuario');
    }
  
    const dados = await response.json();
    
    return dados.id;
  }