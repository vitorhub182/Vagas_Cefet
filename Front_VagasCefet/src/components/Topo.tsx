import Link from "next/link";


export default function Topo(props:any){
    return(
        <div className='topo text-white'>
            <div className='logo'>Vagas.Cefet</div>
            <div>
                <nav className="menu">
                    <Link className="linkMenu" href="/">
                        Home
                    </Link>
                    <Link className="linkMenu" href="/perfil/perfil">
                        Perfil
                    </Link>
                    {props.children}
                </nav>   
            </div>
        </div>
    )
}