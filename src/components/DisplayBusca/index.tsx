import React, { useEffect, useState } from 'react';
import Miniatura from '../Miniatura';
import BuscaAtiva from '../../classes/BuscaAtiva';
import Busca from '../../interfaces/Busca'

type BuscaAtualProps = {
    busca: BuscaAtiva
}

function BuscaAtual({ busca }: BuscaAtualProps) {

    const [ buscaAtiva, setBuscaAtiva ] = useState(({} as Busca))
    useEffect(() => {
        busca.inscrever(setBuscaAtiva)
    })
    return (
        
        <Miniatura busca={buscaAtiva}/>
    )
}

export default BuscaAtual;
