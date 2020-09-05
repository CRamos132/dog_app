import React, { useEffect, useState } from 'react';
import './index.css';
import { Typography } from '@material-ui/core';
import BuscaAtiva from '../../classes/BuscaAtiva';
import Busca from '../../interfaces/Busca';
import BuscaApi from '../../repositories/BuscaApi';
import Loading from '../../imagens/loading.gif';

type BuscaAtualProps = {
    busca: BuscaAtiva
}

function DisplayBusca({ busca }: BuscaAtualProps) {
  const [buscaAtiva, setBuscaAtiva] = useState(({} as Busca));
  // const [imagem, setImagem] = useState(Loading);

  // function selecionaImagem(buscaS: Busca) {
  //   let urlImgA = 'https://dog.ceo/api/breeds/image/random';

  //   if (buscaS.raca && buscaS.raca !== '') {
  //     urlImgA = `https://dog.ceo/api/breed/${buscaS.raca}`;
  //     if (buscaS.subraca !== '') {
  //       urlImgA += `/${buscaS.subraca}`;
  //     }
  //     urlImgA += '/images';
  //   }
  //   BuscaApi(urlImgA)
  //     .then((dados) => {
  //       const imagens = [].concat(dados.message);
  //       const imagemAleatoria = imagens[Math.floor(Math.random() * imagens.length)];
  //       setImagem(imagemAleatoria);
  //     });
  // }

  useEffect(() => {
    busca.inscrever(setBuscaAtiva);
    console.log(buscaAtiva);
    // busca.inscrever(selecionaImagem);
  }, []);

  return (

    <div className="buscaAtiva_main">
      <img className="buscaAtiva_img" alt="Foto de um cachorro" src={buscaAtiva.urlImg} />
      <h1>{buscaAtiva.nome}</h1>
      <div className="buscaAtiva_color" style={{ backgroundColor: buscaAtiva.cor }} />
      <Typography className="buscaAtiva_cap">{buscaAtiva.raca}</Typography>
      <Typography className="buscaAtiva_cap">{buscaAtiva.subraca}</Typography>
      <Typography>{buscaAtiva.idade}</Typography>
    </div>
  );
}

export default DisplayBusca;
