import React from 'react';
import './index.css';
import { Container, Typography } from '@material-ui/core';
import Cadastro from '../../interfaces/Cadastro';

type MiniaturaProps = {
  cadastro: Cadastro
}
function Miniatura({ cadastro }: MiniaturaProps) {
  return (
    <Container className="miniatura_main">
      <div className="miniatura_flex_item">
        <h1 data-testid="mini_nome">{cadastro.nome}</h1>
        <div className="miniatura_color" style={{ backgroundColor: cadastro.cor }} />
        <Typography data-testid="mini_raca" className="miniatura_cap">{cadastro.raca}</Typography>
        <Typography data-testid="mini_subraca" className="miniatura_cap">{cadastro.subraca}</Typography>
        <Typography data-testid="mini_idade">{`Idade: ${cadastro.idade}`}</Typography>
        <Typography>{`Valor: ${cadastro.valor}`}</Typography>
      </div>
      <div className="miniatura_flex_item">
        <img className="miniatura_img" alt="Foto de um cachorro" src={cadastro.urlImg} />
      </div>
    </Container>
  );
}

export default Miniatura;
