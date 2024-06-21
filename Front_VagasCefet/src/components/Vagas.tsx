import { Inter } from "next/font/google";

const inter = Inter({ 
    weight: ["300","400","500"],
    subsets: ["latin"] });

interface vagasInterface{

}

export default function Vagas(props:any){
    return(
        <div>
            <button className={inter.className + `
                flex mx-auto
                h-[150px] w-[400px] bg-gray-300 m-4
            `}>
                {props.children}
            </button>
        </div>
    )
}