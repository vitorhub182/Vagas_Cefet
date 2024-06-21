
import Login from "@/components/Login";
import Topo from "@/components/Topo";
import { Inter } from "next/font/google";
import { z } from 'zod';
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "zod";
import { Input } from "@/components/input";
import { Textarea } from "@nextui-org/input";

const inter = Inter({ 
    weight: ["300","400","500"],
    subsets: ["latin"] });

    const schema = z.object({
        email: z.string().email({message:"Digite um e-mail válido."})
        .min(1, "Campo e-mail não pode ser nulo. "),
        senha:z.string().min(1,"Campo Senha não pode ser nulo."),
})

type DataProps = z.infer<typeof schema>;

export default function PaginaLogin(){
    const { register, handleSubmit, formState: {errors} } = useForm<DataProps>({
        mode: 'onBlur',
        resolver: zodResolver(schema)
    })
    return(
        <div>
            
            <Topo/>
            <form title="Cadastro" onSubmit={handleSubmit((data) => console.log(data))}>
                <h1>Login</h1>

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
                <input className="button" type="submit" value="Enviar" /> 
                
            </form>
        </div>
    )
}