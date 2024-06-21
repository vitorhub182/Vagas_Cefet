//import Image from "next/image";
//import { Inter } from "next/font/google";

//const inter = Inter({ subsets: ["latin"] });

import Topo from "@/components/Topo"
import Card from "@/components/Card"

const nome = 'Luis Guilherme'
let vaga = 'prof'

const produtos=[
  {
    produto:'Mouse',
    valor:49.9,
    desconto:0,
    disponivel:true
  },
  {
    produto:'Teclado',
    valor:69.9,
    desconto:10,
    disponivel:true
  },
  {
    produto:'Monitor',
    valor:659.9,
    desconto:0,
    disponivel:false
  },
  {
    produto:'CPU',
    valor:829.9,
    desconto:0,
    disponivel:true
  },
  {
    produto:'Caixa de Som',
    valor:39.9,
    desconto:0,
    disponivel:false
  }
]

function retnome(){
  return nome
}

const vg=()=>{
  return vaga
}
/*
Componente criado dentro do index
function Topo(){
  return()
}
*/

function calcDesc(v:number, d:number){
  return v-d
}
function calcDesc2(v:number, d:number){
  return v-(d/2)
}


export default function Home() {
  return (
    <main>
      {Topo()}
      <Topo/>
      <div style={teste}>
        <div>Viviane</div>
        /**  CSS inline */
        <div style={{color:'#f00', backgroundColor:'#bbb'}}>Vagas</div>
      </div>
      <div className="flex justify-center gap-3">
        {
          produtos.map((e:any)=>{
            if(e.disponivel){
              return(
                <Card produto={e.produto} valor={e.valor} desconto={e.desconto} funcao={calcDesc} />
              )
            }  
          })
        }
      </div>
    </main>
  );
}

//Definindo CSS como um objeto
const teste={
  display: 'flex',
  justifyContent: 'center',
  alignItens:'center',
  color:'#00f',
  backgroundColor:'#eee',
  fontSize: '20px',

}