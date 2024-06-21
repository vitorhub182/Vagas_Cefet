import Topo from "@/components/Topo"
import Vagas from "@/components/Vagas"

export default function Home(){
    return(
        <main>
            <Topo/>
            <div className="">
                <Vagas>Vaga1</Vagas>
                <Vagas>Vaga2</Vagas>
                <Vagas>Vaga3</Vagas>
                <Vagas>Vaga4</Vagas>
            </div>
        </main>
    )
}