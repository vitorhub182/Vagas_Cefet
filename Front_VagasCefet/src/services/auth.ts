export async function authenticate(email: string, senha: string) {

  try { 
    const response = await fetch('http://localhost:3002/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });
    console.log(response);
  
    if (response.status == 200) {
      const data = await response.json();
      sessionStorage.setItem('access_token', data.access_token);
      sessionStorage.setItem('id', data.id);
      sessionStorage.setItem('username', data.apelido);
      return data.access_token;  
    }else {
      return false;
    }
  } catch {
    //const data = {access_token: '123'};
    //localStorage.setItem('access_token', data.access_token);
    //return data.access_token;
    throw new Error('Falha ao se conectar com a api');
  }

}