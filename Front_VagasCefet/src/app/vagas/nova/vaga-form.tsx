"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { cadastroVaga } from "@/services/vagasService";
import { FalhaRegistroDTO } from "@/dto/falha";
import { useAuth } from "@/context/auth-context";


const FormSchema = z.object({
  titulo: z.string().min(1, "Titulo: Não pode ser nulo."),
  contratante: z.string().min(1, "Contratante: Não pode ser nulo."),
  tipo: z.string().min(1, "Tipo: Não pode ser nulo."),
  requisitos: z.string().min(50, "Requisitos: Deve possuir no mínimo 50 caracteres."),
  detalhes: z.string().max(1000).optional(),
  status: z.number(),
  professorId: z.string().min(36,'professorId: Fora do padrão UUID'),
})

type DataProps = z.infer<typeof FormSchema>;

export default function VagaForm() {

  const {isTeacher} = useAuth();

  const professorId = sessionStorage.getItem('id')
  const form = useForm<DataProps>({
    mode: 'onBlur',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      titulo: '',
      contratante: 'CEFET-MG' ,
      tipo: '',
      requisitos: '' ,
      detalhes: '',
      status: 1,
      professorId: (professorId == null ? 'ABC': professorId),
    }
  });

  async function onSubmit(data:DataProps) {

    try {

      if (isTeacher === false) {
        return (toast({
          variant: "destructive",
          title: "Alunos não podem criar vagas!"
        }));
      }
      const resposta = await cadastroVaga(data);
      console.log(resposta);

      if ('id' in resposta){
        form.reset();
        return (toast({
          title: "Vaga criada com sucesso!",
          description: "Obrigado!",
        })
        );
      } else {
        const falha: FalhaRegistroDTO = resposta;
        
        return (toast({
          variant: "destructive",
          title: "Vaga não criada, corrija:",
          error: falha
        }));
      }
    } catch (error) {
      console.error('Erro ao criar vaga:', error);
      return(
      toast({
        title: "Erro ao criar vaga.",
        description: "Ocorreu um erro ao tentar criar a vaga. Tente novamente."
      }))
    }
  };

  return (
    <Card className="w-[900px] flex-col">
      <CardHeader>
        <CardTitle>Olá Professor, cadastre sua vaga</CardTitle>
        <CardDescription>Vagas registradas neste portal podem apenas ser utilizadas por alunos com matriculas ativas na rede de ensino CEFET</CardDescription>
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
              <Button type="submit" className="p-4  text-white rounded-lg mt-4">Criar Conta</Button>
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
