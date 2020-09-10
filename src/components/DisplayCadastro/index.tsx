import React, { useEffect, useState } from 'react';
import './index.css';
import { Typography } from '@material-ui/core';
import CadastroAtual from '../../classes/CadastroAtual';
import Cadastro from '../../interfaces/Cadastro';

type CadastroAtualProps = {
    cadastro: CadastroAtual
}

function DisplayCadastro({ cadastro }: CadastroAtualProps) {
  const [cadastroAtual, setCadastroAtual] = useState<Cadastro>(cadastro.getCadastro());

  useEffect(() => {
    cadastro.subscribe(setCadastroAtual);
  }, []);

  return (

    <div className="buscaAtiva_main">
      <img className="buscaAtiva_img" alt="Foto de um cachorro" src={cadastroAtual?.urlImg} />
      <h1>{cadastroAtual?.nome}</h1>
      <div className="buscaAtiva_color" style={{ backgroundColor: cadastroAtual?.cor }} />
      <Typography className="buscaAtiva_cap">{cadastroAtual?.raca}</Typography>
      <Typography className="buscaAtiva_cap">{cadastroAtual?.subraca}</Typography>
      <Typography>{`Idade: ${cadastroAtual?.idade}`}</Typography>
      <Typography>{`Valor: ${cadastroAtual?.valor}`}</Typography>
    </div>
  );
}

export default DisplayCadastro;
