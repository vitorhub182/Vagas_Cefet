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
      sessionStorage.setItem('role', data.role);
      return data.access_token;  
    }else {
      return false;
    }
  } catch {
    throw new Error('Falha ao se conectar com a api');
  }

}