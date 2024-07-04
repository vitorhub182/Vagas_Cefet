"use client"
import { toast } from '@/components/ui/use-toast';
import { DescricaoInscricaoDTO } from '@/dto/inscricoes';
import { descricaoInscricao } from '@/services/inscricoesService';
import { descricaoVaga } from '@/services/vagasService';
import React from 'react';


export default function InscricaoPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [data, setData] = React.useState<DescricaoInscricaoDTO>();
  React.useEffect(() => {
    async function fetchData() {
      try {
        const inscricao = await descricaoInscricao(id);
        setData(inscricao);
        return (toast({
          variant: 'default',
          title: 'Descrição de inscrição consultada com sucesso!'
        }))
      } catch (error) {
        console.error("Falha conexão com a API: ", error);
        return (toast({
          variant: 'destructive',
          title: 'Falha ao se conectar com a API para carregar a descricão!'
        }))
        
      }
    }

    fetchData();
  }, [id]);

  const getStatusLabel = (status: number | undefined): string => {
    switch (status) {
      case 0:
        return    'Em avaliação';
      case 1:
        return    'Reprovado';
      case 2:
        return    'Aprovado';
      default:
        return    'Desconhecido';
    };
  };

  return (
    <div>
      <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {data?.alunoId}
      </h3>
      <p>
        Situação atual da inscrição: { getStatusLabel(data?.status) }
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6"> da inscrição: {data?.createdAt}
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Data última atualização de status da inscrição: {data?.updatedAt}
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Identificador da vaga: {data?.vagaId}
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Professor visualizou sua inscrição: {data?.visto}
      </p>
    </div>
  );
}
