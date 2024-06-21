import Link from "next/link";

export default function Login(){
    return(
        <div className={
            `flex justify-center mx-auto my-auto w-[300px]
             h-[500px] mt-[100px] font-bold
              `}>
            <form 
            className={`
                flex flex-col bg-gray-200 rounded-md p-[40px]
                shadow-md gap-[5px]
            
            `} method="post" name="Login">
                <h1 className="flex justify-center text-center text-2xl">Login</h1>
                <label className='label'>E-mail:</label>
                <input className='input' type="email" placeholder="example@gmailcom" autoFocus></input>
                <label className='label'>Senha:</label>
                <input className='input' type="password" placeholder="**************"/>
                <Link className='link' href={"/"}>
                    Esqueci minha Senha
                </Link>
                <input className="btn" type="submit" value="Entrar"/>
                <p className="text-xs mt-5">Ainda não é cadastrado?</p>
                <Link className="link text-xs" href={"/cadastro/cadastro"}>
                    Cadastre-se
                </Link>
            </form>
        </div>
    )}

