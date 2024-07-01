import { ListaVagasDTO } from "@/dto/vagas";

export async function listaVagas() {
  const token = sessionStorage.getItem('access_token');
  try{
    const response = await fetch('http://localhost:3002/vagas/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  
    if (response.status == 401 ) {
      return false;

    }else if (response.status == 200){
      const dados: ListaVagasDTO = await response.json();
      return dados;
    }else {
      throw new Error('Falha ao registrar usuario');
    }
  } catch (error){
    console.log(error);
    throw new Error('Falha ao se conectar com a api');
  }
  }