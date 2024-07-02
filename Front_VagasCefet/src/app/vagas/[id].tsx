// pages/vagas/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

type Vaga = {
  id: string;
  titulo: string;
  tipo: string;
  status: string;
};

type VagaProps = {
  vaga: Vaga;
};

const VagaPage: React.FC<VagaProps> = ({ vaga }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{vaga.titulo}</h1>
      <p>Tipo: {vaga.tipo}</p>
      <p>Status: {vaga.status === '1' ? 'Aberta' : 'Fechada'}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Aqui você faria uma chamada à sua API para obter todos os IDs de vagas
  const res = await fetch('http://localhost:3002/vagas/');
  const vagas: Vaga[] = await res.json();

  const paths = vagas.map((vaga) => ({
    params: { id: vaga.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`http://localhost:3002/vagas/${id}`);
  const vaga: Vaga = await res.json();

  return {
    props: {
      vaga,
    },
  };
};

export default VagaPage;
