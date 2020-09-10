import React, { useState, useEffect } from 'react';
import './index.css';
import { Container } from '@material-ui/core';
import CadastrosSalvos from '../../classes/CadastrosSalvos';
import Cadastro from '../../interfaces/Cadastro';
import Miniatura from '../Miniatura';

type CarrosselProps = {
    cadastrosSalvos: CadastrosSalvos
}
function Carrossel({ cadastrosSalvos }: CarrosselProps) {
  const [cadastros, setCadastros] = useState([] as Cadastro[]);

  useEffect(() => {
    const cadastrosCache = localStorage.getItem('cadastros');
    cadastrosSalvos.subscribe(setCadastros);
    if (cadastrosCache) {
      JSON.parse(cadastrosCache).forEach((cadastro: Cadastro) => cadastrosSalvos.addCadastro(cadastro));
    }
  }, []);

  return (
    <Container className="card_carrossel">
      {cadastros.map((cadastro: Cadastro, index: number) => <Miniatura key={index} cadastro={cadastro} />)}
    </Container>
  );
}

export default Carrossel;
