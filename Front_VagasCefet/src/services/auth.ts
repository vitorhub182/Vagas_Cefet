export async function authenticate(email: string, senha: string) {
    const response = await fetch('http://localhost:3002/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }
  
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    return data.access_token;
  }