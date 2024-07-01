import { CriaUsuarioDTO, FalhaCadastro } from "@/dto/cadastroUsuario";
import { DescricaoUsuarioDTO } from "@/dto/descricaoUsuario";

export async function cadastroUsuario(dadosUsuario: CriaUsuarioDTO) {

  try{
    const response = await fetch('http://localhost:3002/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosUsuario),
    });
  
    if (response.status == 400 ) {
      const respostaAPI = await response.json();
      console.log(respostaAPI.message)
      return respostaAPI; 
      
    }else if (response.status == 201){
      const dados = await response.json();
      console.log(dados);
      return dados;
    }else {
      throw new Error('Falha ao registrar usuario');
    }
  } catch (error){
    console.log(error);
    throw new Error('Falha ao se conectar com a api');
  }
  }