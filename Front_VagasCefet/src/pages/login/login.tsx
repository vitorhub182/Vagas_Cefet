
import Login from "@/components/Login";
import Topo from "@/components/Topo";
import { Inter } from "next/font/google";

const inter = Inter({ 
    weight: ["300","400","500"],
    subsets: ["latin"] });

export default function PaginaLogin(){
    return(
        <div className={inter.className}>
            <Topo></Topo>
            <Login> 
            </Login>   
        </div>
    )
}