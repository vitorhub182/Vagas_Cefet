"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useParams } from 'next/navigation';
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { atualizarVaga, descricaoVaga } from "@/services/vagasService";
import { FalhaRegistroDTO } from "@/dto/falha";
import { useAuth } from "@/context/auth-context";
import React from "react";

const FormSchema = z.object({
  id: z.string().min(36, 'id não coincide com o tipo UUID'),
  titulo: z.string().min(1, "Titulo: Não pode ser nulo."),
  contratante: z.string().min(1, "Contratante: Não pode ser nulo."),
  tipo: z.string().min(1, "Tipo: Não pode ser nulo."),
  requisitos: z.string().min(50, "Requisitos: Deve possuir no mínimo 50 caracteres."),
  detalhes: z.string().max(1000).optional(),
  status: z.number(),
});

type DataProps = z.infer<typeof FormSchema>;

export default function AtualizaVagaForm() {
  const params = useParams();
  const vagaId = params.id;
  const { isTeacher } = useAuth();
  const [defaultValues, setDefaultValues] = React.useState<DataProps>({
    id: '',
    titulo: '',
    contratante: '',
    tipo: '',
    requisitos: '',
    detalhes: '',
    status: 1,
  });

  const [shouldFetchData, setShouldFetchData] = React.useState(true);

  React.useEffect(() => {
    if (!shouldFetchData || !vagaId) return;

    async function fetchData() {
      try {
        const vagaData = await descricaoVaga(vagaId as string);
        setDefaultValues({
          id: vagaData.id || '',
          titulo: vagaData.titulo || '',
          contratante: vagaData.contratante || '',
          tipo: vagaData.tipo || '',
          requisitos: vagaData.requisitos || '',
          detalhes: vagaData?.detalhes || '',
          status: vagaData.status || '',
        });
        toast({
          variant: 'default',
          title: 'Vaga consultada com sucesso!'
        });
        setShouldFetchData(false);
      } catch (error) {
        console.error("Falha conexão com a API: ", error);
        toast({
          variant: 'destructive',
          title: 'Falha ao se conectar com a API para carregar a lista!'
        });
      }
    }

    fetchData();
  }, [vagaId, shouldFetchData]);

  const form = useForm<DataProps>({
    mode: 'onBlur',
    resolver: zodResolver(FormSchema),
    defaultValues
  });

  React.useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  async function onSubmit(data: DataProps) {
    try {
      if (isTeacher === false) {
        return toast({
          variant: "destructive",
          title: "Alunos não podem atualizar vagas!"
        });
      }
      const resposta = await atualizarVaga(data);
      console.log(resposta);

      if ('id' in resposta) {
        form.reset();
        setShouldFetchData(true);
        return toast({
          title: "Vaga atualizada com sucesso!",
          description: "Obrigado!",
        });
      } else {
        const falha: FalhaRegistroDTO = resposta;
        return toast({
          variant: "destructive",
          title: "Vaga não atualizada, corrija:",
          description: falha.error
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar vaga:', error);
      return toast({
        title: "Erro ao atualizar vaga.",
        description: "Ocorreu um erro ao tentar atualizar a vaga. Tente novamente."
      });
    }
  };
  return (
    <Card className="w-[900px] flex-col">
      <CardHeader>
        <CardTitle>Olá Professor, atualize esta vaga</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contratante"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contratante</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <Input placeholder="Estagio, Junior, Pleno, Senior..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requisitos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requisitos</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva o que é necessário para preencher a vaga" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detalhes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detalhes adicionais</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva demais informações relevantes, valores, benefícios, horários..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="flex justify-between">
              <Button type="submit" className="p-4 text-white rounded-lg mt-4">Atualizar Vaga</Button>
              <Link href="/vagas" className={buttonVariants({ variant: 'link' })}>
                Voltar para a lista de vagas
              </Link>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
