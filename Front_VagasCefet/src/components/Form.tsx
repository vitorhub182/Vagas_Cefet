import Link from "next/link";
import {Textarea} from "@nextui-org/input";
export default function Cadastro(){
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
                <label className='label'>Matricula:</label>
                <input className='input' type="text" placeholder="SINF1234" autoFocus></input>
                <label className='label'>E-mail:</label>
                <input className='input' type="email" placeholder="example@gmailcom" autoFocus></input>
                <label className='label'>Senha:</label>
                <input className='input' type="password" placeholder="**************"/>
                <label className='label'>Confirmar Senha:</label>
                <input className='input' type="password" placeholder="**************"/>
                <label className='label'>Nome Completo:</label>
                <input className='input' type="text" placeholder="João Vitor Dias" autoFocus></input>
                <label className='label'>apelido</label>
                <input className='input' type="text" placeholder="alunocefet" autoFocus></input>
                <label className='label'>Resumo:</label>
                <input className='input' type="textbox"  autoFocus></input>
                <label className='label'>Competencia:</label>
                <input className='input' type="textarea" autoFocus></input>
                <label className='label'>Formações:</label>
                <Textarea className="max-w-xs textarea"></Textarea>
                <input className="btn" type="submit" value="Editar"/>
            </form>
        </div>
    )
}