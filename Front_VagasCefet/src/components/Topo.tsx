import Link from "next/link";


export default function Topo(props:any){
    return(
        <div className='topo text-white'>
            <div className='logo'>cefetvagas.com</div>
            <div>
                <nav className="menu">
                    <Link className="linkMenu" href="/">
                        Home
                    </Link>
                    <Link className="linkMenu" href="/cadastro/cadastro">
                        Cadastro
                    </Link>
                    <Link className="linkMenu" href="/login/login">
                        Login
                    </Link>
                    {props.children}
                </nav>   
            </div>
        </div>
    )
}