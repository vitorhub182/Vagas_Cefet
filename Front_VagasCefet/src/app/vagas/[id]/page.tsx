"use client"
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/auth-context';
import { CriaInscricaoDTO } from '@/dto/inscricoes';
import { DescricaoVagaDTO } from '@/dto/vagas';

import { cadastroInscricao } from '@/services/inscricoesService';
import { descricaoVaga, deletarVaga } from '@/services/vagasService';
import React from 'react';


export default function VagaPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [data, setData] = React.useState<DescricaoVagaDTO>();
  const hasFetchedData = React.useRef(false); 
  const {isTeacher} = useAuth();

  React.useEffect(() => {

    async function fetchData() {
      if (hasFetchedData.current) return; 
      hasFetchedData.current = true; 
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
    }fetchData();
    
  }, []);
  async function inscricao() {
    const alunoId = sessionStorage.getItem('id') || '';
    const dadosCriaInscricao: CriaInscricaoDTO = {
      alunoId: alunoId,
      vagaId: id,
    }

    try {
      if (isTeacher === true) { 
        return (toast({
          variant: 'destructive',
          title: 'Professor não pode inscrever-se!'
        }))  
      }

      const resposta = await cadastroInscricao(dadosCriaInscricao);
      
      if ('message' in resposta){
        return (toast({
          variant: "destructive",
          title: "Você já está inscrito nesta vaga!",
          description: 'Aguarde seu resultado!'
        }));
      }
      else if ('id' in resposta){
        
        return (toast({
          variant: 'default',
          title: "Inscrição criada com sucesso!",
          description: "Obrigado!",
        })
        );
      }else {
        return (toast({
          variant: 'destructive',
          title: "Falha durante a inscrição!",
          description: "Consulte o suporte técnico!",
        })
        );
      }
    } catch (error) {
      console.error("Falha conexão com a API: ", error);
      return (toast({
        variant: 'destructive',
        title: 'Falha ao se conectar com a API para executar a inscrição!'
      }))
      
    }
  }
  async function delecao() {
    
    try {
      if (isTeacher === false) { 
        return (toast({
          variant: 'destructive',
          title: 'Aluno não pode deletar uma vaga!'
        }))  
      }

      const resposta = await deletarVaga(id);
      
      if ('message' in resposta){
        if (resposta.statusCode === 404){
        return (toast({
          variant: "destructive",
          title: "Vaga já deletada ou inexistente!",
        }));
      }
      }
      else if ('id' in resposta){
        
        return (toast({
          variant: 'default',
          title: "Vaga deletada com sucesso!",
        })

        );
      }else {
        return (toast({
          variant: 'destructive',
          title: "Falha durante a deleção!",
          description: "Consulte o suporte técnico!",
        })
        );
      }
    } catch (error) {
      console.error("Falha conexão com a API: ", error);
      return (toast({
        variant: 'destructive',
        title: 'Falha ao se conectar com a API para executar a deleção!'
      }))
      
    }
  }

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
      <div>
      {!isTeacher && (
                      <Button
                      className="text-center mt-3" variant={'default'}
                      onClick={() => (inscricao())}
                      > Inscrever-se</Button>
                  )}
      {isTeacher && (
                      <Button
                      className="text-center mt-3" variant={'destructive'}
                      onClick={() => (delecao())}
                      > Deletar esta vaga</Button>
      )}
      </div>
    </div>
  );
}
