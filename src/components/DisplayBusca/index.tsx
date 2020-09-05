import React, { useEffect, useState } from 'react';
import './index.css';
import { Typography } from '@material-ui/core';
import BuscaAtiva from '../../classes/BuscaAtiva';
import Busca from '../../interfaces/Busca';

type BuscaAtualProps = {
    busca: BuscaAtiva
}

function DisplayBusca({ busca }: BuscaAtualProps) {
  const [buscaAtiva, setBuscaAtiva] = useState(({} as Busca));

  useEffect(() => {
    busca.inscrever(setBuscaAtiva);
  }, []);

  return (

    <div className="buscaAtiva_main">
      <img className="buscaAtiva_img" alt="Foto de um cachorro" src={buscaAtiva.urlImg} />
      <h1>{buscaAtiva.nome}</h1>
      <div className="buscaAtiva_color" style={{ backgroundColor: buscaAtiva.cor }} />
      <Typography className="buscaAtiva_cap">{buscaAtiva.raca}</Typography>
      <Typography className="buscaAtiva_cap">{buscaAtiva.subraca}</Typography>
      <Typography>{`Idade: ${buscaAtiva.idade}`}</Typography>
      <Typography>{`Valor: ${buscaAtiva.valor}`}</Typography>
    </div>
  );
}

export default DisplayBusca;
