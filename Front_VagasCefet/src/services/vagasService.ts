import { DescricaoVagasDTO, ListaVagasDTO } from "@/dto/vagas";

export async function listaVagas() {
  const token = sessionStorage.getItem('access_token');
  if (!token){
    throw new Error('Token não encontrado!')
  }
  try{
    const response = await fetch('http://localhost:3002/vagas/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  
    if (response.status == 401 ) {
      
      const dados: any  = [];
      return dados; 

    }else if (response.status == 200){
      const dados: ListaVagasDTO = await response.json();
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

  export async function descricaoVaga(id : string) {
    const token = sessionStorage.getItem('access_token');
    if (!token){
      throw new Error('Token não encontrado!')
    }
    try{
      const response = await fetch(`http://localhost:3002/vagas/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    
      if (response.status == 401 ) {
        
        const dados: any  = [];
        return dados; 
  
      }else if (response.status == 200){
        const dados: DescricaoVagasDTO = await response.json();
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