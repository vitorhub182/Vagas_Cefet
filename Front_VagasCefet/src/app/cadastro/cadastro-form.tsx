"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cadastroUsuario } from "@/services/cadastroService";
import { FalhaCadastro } from "@/dto/usuario";


const FormSchema = z.object({
  nome_completo: z.string().min(1, "Campo Nome não pode ser nulo."),
  email: z.string().email({ message: "Digite um e-mail válido." }).min(1, "Campo e-mail não pode ser nulo."),
  senha: z.string().min(1, "Campo Senha não pode ser nulo."),
  confirmarSenha: z.string().min(1, "Campo Confirmar senha não pode ser nulo."),
  role: z.string().min(1, "Campo Ativo não pode ser nulo."),
  apelido: z.string().min(1, "Campo Apelido não pode ser nulo."),
  resumo: z.string().max(300).optional(),
  formacao: z.string().max(300).optional(),
  exp_profissional: z.string().max(300).optional(),
}).refine(({ senha, confirmarSenha }) => senha === confirmarSenha, {
  message: "Senhas não são iguais.",
  path: ["confirmarSenha"]
});

type DataProps = z.infer<typeof FormSchema>;

export default function CadastroForm() {

  const form = useForm<DataProps>({
    mode: 'onBlur',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome_completo: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      role: '',
      apelido: '',
      resumo: '',
      formacao: '',
      exp_profissional: ''
    }
  });

  async function onSubmit(data:DataProps) {
    const { confirmarSenha, ...formData } = data;

    try {
      const resposta = await cadastroUsuario(formData);

      if ('id' in resposta){
        form.reset();
        return (toast({
          title: "Usuário criado com sucesso!",
          description: "Você pode fazer login agora.",
        })
        );
      } else {
        const falha: FalhaCadastro = resposta;
        
        return (toast({
          variant: "destructive",
          title: "Usuário não criado, corrija:",
          error: falha
        }));
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return(
      toast({
        title: "Erro ao criar usuário.",
        description: "Ocorreu um erro ao tentar criar o usuário. Tente novamente."
      }))
    }
  };

  return (
    <Card className="w-[900px] flex-col">
      <CardHeader>
        <CardTitle>Cadastre-se</CardTitle>
        <CardDescription>Encontre as oportunidades que somente o CEFET pode te oferecer</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="nome_completo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmarSenha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apelido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de Usuário</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resumo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resumo</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Fale sobre você" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="formacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formação</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva suas conquistas acadêmicas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="exp_profissional"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experiência Profissional</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva suas experiências profissionais" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Conta</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de conta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="aluno">Aluno</SelectItem>
                        <SelectItem value="professor">Professor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="flex justify-between">
              <Button type="submit" className="p-4  text-white rounded-lg mt-4">Criar Conta</Button>
              <Link href="/login" className={buttonVariants({ variant: 'link' })}>
                Já tenho cadastro
              </Link>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
