
import Login from "@/components/Login";
import Topo from "@/components/Topo";
import { Inter } from "next/font/google";
import { z } from 'zod';
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "zod";
import { Input } from "@/components/input";
import { Textarea } from "@nextui-org/input";
import Link from "next/link";
import { useState } from "react";
import { LoginDTO } from "@/types/login";
import api from "@/services/api";
import { redirect, RedirectType } from "../../../node_modules/next/navigation";
import { url } from "inspector";
import { useRouter } from "../../../node_modules/next/router";

const inter = Inter({ 
    weight: ["300","400","500"],
    subsets: ["latin"] });

    const schema = z.object({
        email: z.string().email({message:"Digite um e-mail válido."})
        .min(1, "Campo e-mail não pode ser nulo. "),
        senha:z.string().min(1,"Campo Senha não pode ser nulo."),
})

type DataProps = z.infer<typeof schema>;


const LoginUsuarioForm: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const { register, handleSubmit, formState: { errors } } = useForm<DataProps>({
        mode: 'onBlur',
        resolver: zodResolver(schema)
    });

    const router = useRouter();

    const onSubmit = async (data: DataProps) => {
        try {
            const response = await api.post<LoginDTO>('/login', data);
            
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            
            setMessage('Usuário logado com sucesso com sucesso!');
            // Limpar formulário após o envio
            Object.keys(data).forEach(key => {
                data[key as keyof DataProps] = '';
            });

            router.push('/');

        } catch (error) {
            setMessage('Erro ao realizar login usuário.');
            console.error('Erro ao realizar o login usuário:', error);
        }
    };
    return(
        <div>
            <Topo/>
            <form title="Login" onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
                <Input {... register('email')}
                 type="text"
                  placeholder="Digite seu email"
                  label="E-mail:"
                  helperText={errors.email?.message}
                  />
                <Input {... register('senha')}
                 type="password"
                  placeholder="Digite sua senha"
                  label="Senha:"
                  helperText={errors.senha?.message}
                  />
                <Link className='link text-[14px] mt-1' href={"/"}>
                    Esqueci minha Senha
                </Link>
                <input className="button" type="submit" value="Enviar" /> 

                <p className="text-[14px] mt-5">Ainda não é cadastrado?</p>
                <Link className="link text-[14px]" href={"/cadastro/cadastro"}>
                    Cadastre-se
                </Link>
                
            </form>
        </div>
    )
}

export default LoginUsuarioForm