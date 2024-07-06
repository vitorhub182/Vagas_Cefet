"use client"
import { AtualizaInscricaoDTO, DescricaoInscricaoDTO } from '@/dto/inscricoes';
import { descricaoInscricao, atualizaInscricao } from '@/services/inscricoesService';
import React from 'react';
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from '@/context/auth-context';

export default function InscricaoPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [data, setData] = React.useState<DescricaoInscricaoDTO>();
  
  const hasFetchedData = React.useRef(false);
  const {isTeacher} = useAuth();
  
  React.useEffect(() => {
    async function fetchData() {
      if (hasFetchedData.current) return; 
      hasFetchedData.current = true; 
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
        return 'Em avaliação';
      case 1:
        return 'Reprovado';
      case 2:
        return 'Aprovado';
      default:
        return 'Desconhecido';
    };
  };

  const handleStatusChange = async (value: string) => {
    const updatedStatus = parseInt(value, 10);

    const updateData: AtualizaInscricaoDTO = {
      visto: true,
      status: updatedStatus,
    };

    try {
      await atualizaInscricao(id, updateData);
      toast({
        variant: 'default',
        title: 'Status da inscrição atualizado com sucesso!'
      });
    } catch (error) {
      console.error("Erro ao atualizar status da inscrição: ", error);
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar status da inscrição!'
      });
    }
  };

  return (
    <div>
      <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {data?.alunoId}
      </h3>
      <p>
        Situação atual da inscrição: {getStatusLabel(data?.status)}
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Data da inscrição: {data?.createdAt}
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Data última atualização de status da inscrição: {data?.updatedAt}
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Identificador da vaga: {data?.vagaId}
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Professor visualizou sua inscrição: {data?.visto ? 'Sim' : 'Não'}
      </p>
      <p> 
        {isTeacher && (
          <Select onValueChange={handleStatusChange}>
            Modifique o estágio da inscrição do usuário:
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado da inscrição" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Escolha:</SelectLabel>
                <SelectItem value="0">Em avaliação</SelectItem>
                <SelectItem value="1">Reprovada</SelectItem>
                <SelectItem value="2">Aprovada</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </p>
    </div>
  );
}
