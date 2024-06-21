
import React, { useEffect, useState } from 'react';
import Topo from '@/components/Topo';
import Vagas from '@/components/Vagas';
import Link from 'next/link';
import api from '@/services/api'; // Importe o axios configurado

export default function Home() {
    const [vagas, setVagas] = useState([]);

    useEffect(() => {
        const fetchVagas = async () => {
            try {
                const response = await api.get('/vagas');
                setVagas(response.data);
            } catch (error) {
                console.error('Erro ao carregar vagas:', error);
            }
        };

        fetchVagas();
    }, []);

    return (
        <main>
            <Topo>
                <Link className="linkMenu" href="/vaga/cadastrovagas">
                    Cadastrar Vagas
                </Link>
            </Topo>

            <div>
                {vagas.map((vaga: any, index: number) => (
                    <Vagas key={index}>{vaga.titulo}</Vagas>
                ))}
            </div>
        </main>
    );
}