import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

const VagaPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [vaga, setVaga] = useState<Vaga | null>(null);

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const response = await api.get(`/vagas/${id}`);
        if (response.data) {
          setVaga(response.data);
        } else {
          throw new Error('Vaga não encontrada');
        }
      } catch (error) {
        console.error('Erro ao carregar a vaga:', error);
      }
    };

    if (id) {
      fetchVaga();
    }
  }, [id]);

  if (!vaga) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{vaga.titulo}</h1>
      <p><strong>Contratante:</strong> {vaga.contratante}</p>
      <p><strong>Tipo:</strong> {vaga.tipo}</p>
      <p><strong>Requisitos:</strong> {vaga.requisitos}</p>
      <p><strong>Detalhes:</strong> {vaga.detalhes}</p>
      {/* Outros campos da vaga conforme necessário */}
    </div>
  );
};

export default VagaPage;