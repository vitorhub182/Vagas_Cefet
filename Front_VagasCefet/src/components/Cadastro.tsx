import Link from "next/link";
import {Textarea} from "@nextui-org/input";
import axios from 'axios';

const createUser = async(data:{
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
        'http://localhost:3002/usuarios/', data
    )
    return response.data
}

export default function Cadastro(){
    
    const createdUser = await createUser({
        nome: 'nome',
        email: 'email',
        senha: 'senha',
        role: 'usuario',
        
    })

    return(
        <div className={
            `flex justify-center mx-auto my-auto
             mt-[100px] font-bold`}>
            <form 
            className={`
                flex flex-col bg-gray-200 w-[700px] rounded-md p-[40px]
                shadow-md gap-[5px]
            
            `} method="post" name="Cadastro">
                <h1 className="flex justify-center text-center text-2xl">Cadastro</h1>
                <label className='label'>E-mail:</label>
                <input className='input' name="email" type="email" placeholder="example@gmailcom" autoFocus></input>
                <label className='label'>Senha:</label>
                <input className='input'name="senha" type="password" placeholder="**************"/>
                <label className='label'>Confirmar Senha:</label>
                <input className='input' name="" type="password" placeholder="**************"/>
                <label className='label'>Nome Completo:</label>
                <input className='input' name="nome" type="text" placeholder="João Vitor Dias" autoFocus></input>
                <label className='label' >apelido</label>
                <input className='input' name="apelido" type="text" placeholder="alunocefet" autoFocus></input>
                <label className='label'>ativo:</label>
                <label className='label'>
                    <input type="radio" name="usuario" value="Professor" />Professor
                </label>
                <label className="label">
                <input type="radio" name="usuario" value="Professor" />Aluno 
                </label>
                <label className='label'>Resumo:</label>
                <input className='input' name="resumo" type="textbox"  autoFocus></input>
                <label className='label'>Experiência:</label>
                <input className='input' name="exp" type="textarea" autoFocus></input>
                <label className='label'>Formações:</label>
                <Textarea name="formacao" className="max-w-xs textarea"></Textarea>
                <input className="btn" type="submit" value="Cadastrar"/>
            </form>
        </div>
    )
}