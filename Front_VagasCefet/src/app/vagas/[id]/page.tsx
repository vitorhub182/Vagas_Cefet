"use client"
import { toast } from '@/components/ui/use-toast';
import { DescricaoVagaDTO } from '@/dto/vagas';
import { descricaoVaga } from '@/services/vagasService';
import React from 'react';


export default function VagaPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [data, setData] = React.useState<DescricaoVagaDTO>();
  React.useEffect(() => {
    async function fetchData() {
      try {
        const vaga = await descricaoVaga(id);
        setData(vaga);
        return (toast({
          variant: 'default',
          title: 'Descrição de vaga consultada com sucesso!'
        }))
      } catch (error) {
        console.error("Falha conexão com a API: ", error);
        return (toast({
          variant: 'destructive',
          title: 'Falha ao se conectar com a API para carregar a descrição!'
        }))
        
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {data?.titulo}
      </h1>
      <p>
        Situação atual da vaga: {data?.status === 1 ? 'Aberta' : 'Fechada'}
      </p>
      <h3 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Tipo de Vaga: {data?.tipo}
      </h3>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Detalhes
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {data?.detalhes}
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Requisitos
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {data?.requisitos}
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Contratante
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {data?.contratante}
      </p>
    </div>
  );
}
