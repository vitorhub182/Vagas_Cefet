// pages/vagas/index.tsx
import React, { useEffect, useState } from 'react';
import Topo from '@/components/Topo';
import Vagas from '@/components/Vagas';
import Link from 'next/link';
import api from '@/services/api';

interface Vaga {
  id: string;
  titulo: string;
  contratante: string;
  tipo: string;
  requisitos: string;
  detalhes: string;
  status: number;
  professorId: string;
}

const Home = () => {
  const [vagas, setVagas] = useState<Vaga[]>([]);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await api.get('/vagas');
        setVagas(response.data);
      } catch (error) {
        console.error('Erro ao carregar vagas:', error);
      }
    };

    fetchVagas();
  }, []);

  return (
    <main>
      <Topo>
        <Link href="/vaga/cadastrovagas">
          <a className="linkMenu">Cadastrar Vagas</a>
        </Link>
      </Topo>

      <div>
        {vagas.map((vaga: Vaga) => (
          <Link key={vaga.id} href={`/vagas/${vaga.id}`}>
            <a>
              <Vagas>{vaga.titulo}</Vagas>
            </a>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;
