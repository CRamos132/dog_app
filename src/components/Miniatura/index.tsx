import React from 'react';
import './index.css';
import { Container, Typography } from '@material-ui/core';
import Busca from '../../interfaces/Busca';

type MiniaturaProps = {
    busca: Busca
}
function Miniatura({ busca }: MiniaturaProps) {
  return (
    <Container className="miniatura_main">
      <div className="miniatura_flex_item">
        <h1 data-testid="mini_nome">{busca.nome}</h1>
        <div className="miniatura_color" style={{ backgroundColor: busca.cor }} />
        <Typography data-testid="mini_raca" className="miniatura_cap">{busca.raca}</Typography>
        <Typography data-testid="mini_subraca" className="miniatura_cap">{busca.subraca}</Typography>
        <Typography data-testid="mini_idade">{`Idade: ${busca.idade}`}</Typography>
        <Typography>{`Valor: ${busca.valor}`}</Typography>
      </div>
      <div className="miniatura_flex_item">
        <img className="miniatura_img" alt="Foto de um cachorro" src={busca.urlImg} />
      </div>
    </Container>
  );
}

export default Miniatura;
