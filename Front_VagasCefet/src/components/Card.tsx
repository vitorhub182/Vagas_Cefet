interface CardProps{
    produto:string,
    valor:number,
    desconto:number,
    funcao:any
}

export default function Card(props:CardProps){
    return(
        <div className='flex justify-center flex-col border-4 border-red-700 rounded-sm p-1 font-bold' >
            <div>Produto: R${props.produto}</div>
            <div>Valor: R${props.valor}</div>

            {props.desconto>0 ? (
                <div>
                    <div>Desconto: R${props.desconto}</div>
                    <div>Preço Venda R${props.funcao(props.valor, props.desconto)}</div>
                </div>

            ):""}
            
        </div>
    )
}