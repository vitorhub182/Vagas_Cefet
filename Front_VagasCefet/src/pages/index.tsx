import Topo from "@/components/Topo"
import Vagas from "@/components/Vagas"
import Link from "next/link"

export default function Home(){
    return(
        <main>
            <Topo> 
                 <Link className="linkMenu" href="/vaga/cadastrovagas">
                        Cadastrar Vagas
                 </Link>
            </Topo>

            <div className="">
                <Vagas>Vaga1</Vagas>
                <Vagas>Vaga2</Vagas>
                <Vagas>Vaga3</Vagas>
                <Vagas>Vaga4</Vagas>
            </div>
        </main>
    )
}