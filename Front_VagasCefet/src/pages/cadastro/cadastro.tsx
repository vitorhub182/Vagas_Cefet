import Cadastro from "@/components/Cadastro";
import React from "react";
import Topo from "@/components/Topo";


import { z } from 'zod';
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "zod";
import { Input } from "@/components/input";
import { Textarea } from "@nextui-org/input";
import axios from "axios";


const createUser = async (data:{
    nome: string;
    email: string;
    senha: string;
    role: boolean;
    apelido: string;
    resumo: string;
    formacao: string;
    expProfissional: string;
}) => {
    const response = await axios.post(
        'http://localhost:3002/usuarios', data
    )
    return response.data
}

const schema = z.object({
    nome: z.string().min(1, "Campo Nome não pode ser nulo."),
    email: z.string().email({message:"Digite um e-mail válido."})
    .min(1, "Campo e-mail não pode ser nulo. "),
    senha:z.string().min(1,"Campo Senha não pode ser nulo."),
    confirmarSenha: z.string().min(1,"Campo Confirmar senha não pode ser nulo."),
    ativo: z.string().min(1, "Campo Ativo não pode ser nulo." ),
    apelido: z.string().min(1, "Campo Apelido não pode ser nulo." ),
    resumo:z.string().max(300),
    formacao:z.string().max(300),
    expProfissional:z.string().max(300),
})
.refine(({senha, confirmarSenha}) => senha === confirmarSenha, {
    message: "Senhas não são iguais.",
    path: ["confirmarSenha"]
})

type DataProps = z.infer<typeof schema>;

export default function PaginaCadastro(){
    const createdUser = createUser({
        nome: 'nome',
        email: 'email',
        senha: 'senha',
        role: true,
        apelido: 'apelido',
        resumo: 'resumo',
        formacao: 'formacao',
        expProfissional: 'expProfissional'

    })

    console.log({createdUser});
    

    const { register, handleSubmit, formState: {errors} } = useForm<DataProps>({
        mode: 'onBlur',
        resolver: zodResolver(schema)
    })


    return(
        <div>
            
            <Topo/>
            <form title="Cadastro" onSubmit={handleSubmit((data) => console.log(data))}>
                <h1>Cadastro</h1>
                <Input {... register('nome')}
                 type="text"
                  placeholder="Digite seu nome completo"
                  label="Nome:"
                  helperText={errors.nome?.message}
                  />

            <Input {... register('email')}
                 type="text"
                  placeholder="Digite seu nome completo"
                  label="E-mail:"
                  helperText={errors.email?.message}
                  />

                <Input {... register('senha')}
                 type="password"
                  placeholder="Digite sua senha"
                  label="Senha:"
                  helperText={errors.senha?.message}
                  />

                <Input {... register('confirmarSenha')}
                 type="password"
                  placeholder="Digite sua senha"
                  label="Confirme sua senha:"
                  helperText={errors.confirmarSenha?.message}
                  />
                <label>
                    <Input className="radio" {... register('ativo')} name="ativo" type="radio" value={0} checked label="Ativo:"/>
                    <label>Professor</label>

                    <Input className="radio" {... register('ativo')} type="radio" value={1}/>
                    <label>Aluno</label>

                </label>
                <Input {... register('apelido')}
                 type="text"
                  placeholder="Digite nome de login"
                  label="Nome de login:"
                  helperText={errors.apelido?.message}
                  />

                <Textarea className="TextArea" {... register('resumo')}
                  placeholder="Resumo..."
                  label="Resumo:"
                  />

                <Textarea className="TextArea" {... register('formacao')}
                  placeholder="Formação..."
                  label="Formação:"/>

                <Textarea className="TextArea" {... register('expProfissional')}
                  placeholder="Experiencia profissional..."
                  label="Experiencia profissional:"/>

                <input className="button" type="submit" value="Enviar" /> 
                
            </form>
        </div>
    )
}

