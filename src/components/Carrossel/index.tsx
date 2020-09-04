import React, { useState, useEffect } from 'react';
import './index.css';
import { Container } from '@material-ui/core';
import BuscasDogs from '../../classes/BuscasDogs';
import Busca from '../../interfaces/Busca';
import Miniatura from '../Miniatura';

type CarrosselProps = {
    buscasSalvas: BuscasDogs
}
function Carrossel({buscasSalvas}: CarrosselProps) {

    const [ buscas, setBuscas ] = useState([] as Busca[])

    useEffect(() => {
        const buscasCache = localStorage.getItem('buscas')
        buscasSalvas.inscrever(setBuscas)
        if(buscasCache) {
            JSON.parse(buscasCache).forEach((busca: Busca) => buscasSalvas.addBusca(busca))
        }
    }, [])

    return (
        <Container className="card_carrossel">
            {buscas.map((busca: Busca, index: number) => <Miniatura key={index} busca={busca}/>)}
        </Container>
    )
}

export default Carrossel;