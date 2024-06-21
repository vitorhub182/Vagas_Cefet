import Cadastro from "@/components/Cadastro";
import React, { FormEvent, useState } from "react";
import Topo from "@/components/Topo";
import { z } from 'zod';
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { Textarea } from "@nextui-org/input";
import axios from "axios";
import { CriaUsuarioDTO, Usuario } from "@/types/Usuario";
import api from "@/services/api";

const schema = z.object({
    nome_completo: z.string().min(1, "Campo Nome não pode ser nulo."),
    email: z.string().email({message:"Digite um e-mail válido."}).min(1, "Campo e-mail não pode ser nulo."),
    senha: z.string().min(1,"Campo Senha não pode ser nulo."),
    confirmarSenha: z.string().min(1,"Campo Confirmar senha não pode ser nulo."),
    role: z.string().min(1, "Campo Ativo não pode ser nulo." ),
    apelido: z.string().min(1, "Campo Apelido não pode ser nulo." ),
    resumo: z.string().max(300).optional(),
    formacao: z.string().max(300).optional(),
    exp_profissional: z.string().max(300).optional(),
}).refine(({ senha, confirmarSenha }) => senha === confirmarSenha, {
    message: "Senhas não são iguais.",
    path: ["confirmarSenha"]
});

type DataProps = z.infer<typeof schema>;

const UsuarioForm: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const { register, handleSubmit, formState: { errors } } = useForm<DataProps>({
        mode: 'onBlur',
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: DataProps) => {
        const { confirmarSenha, ...formData } = data;
        try {
            const response = await api.post<CriaUsuarioDTO>('/usuarios', formData);
            setMessage('Usuário criado com sucesso!');
            // Limpar formulário após o envio
            Object.keys(data).forEach(key => {
                data[key as keyof DataProps] = '';
            });
        } catch (error) {
            setMessage('Erro ao criar usuário.');
            console.error('Erro ao criar usuário:', error);
        }
    };

    return (
        <div>
            <Topo />
            <form title="Cadastro" onSubmit={handleSubmit(onSubmit)}>
                <h1>Cadastro</h1>
                <Input {...register('nome_completo')}
                    type="text"
                    placeholder="Digite seu nome completo"
                    label="Nome:"
                    helperText={errors.nome_completo?.message}
                />

                <Input {...register('email')}
                    type="text"
                    placeholder="Digite seu email"
                    label="E-mail:"
                    helperText={errors.email?.message}
                />

                <Input {...register('senha')}
                    type="password"
                    placeholder="Digite sua senha"
                    label="Senha:"
                    helperText={errors.senha?.message}
                />

                <Input {...register('confirmarSenha')}
                    type="password"
                    placeholder="Digite sua senha novamente"
                    label="Confirme sua senha:"
                    helperText={errors.confirmarSenha?.message}
                />

                <label>
                    <Input className="radio" {...register('role')} type="radio" value="professor" />
                    <label>Professor</label>

                    <Input className="radio" {...register('role')} type="radio" value="aluno" />
                    <label>Aluno</label>
                </label>

                <Input {...register('apelido')}
                    type="text"
                    placeholder="Digite nome de login"
                    label="Nome de login:"
                    helperText={errors.apelido?.message}
                />

                <Textarea className="TextArea" {...register('resumo')}
                    placeholder="Resumo..."
                    label="Resumo:"
                />

                <Textarea className="TextArea" {...register('formacao')}
                    placeholder="Formação..."
                    label="Formação:"
                />

                <Textarea className="TextArea" {...register('exp_profissional')}
                    placeholder="Experiencia profissional..."
                    label="Experiencia profissional:"
                />

                <input className="button" type="submit" value="Enviar" /> 
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default UsuarioForm;
