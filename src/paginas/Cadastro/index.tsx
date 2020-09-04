import React, { Component } from 'react';
import './index.css';
import { Container } from '@material-ui/core';
import Carrossel from '../../components/Carrossel';
import Formulario from '../../components/Formulario';
import BuscasDogs from '../../classes/BuscasDogs';
import BuscaAtiva from '../../classes/BuscaAtiva';
import BuscaAtual from '../../components/DisplayBusca';

interface ContainerProps {}
interface ContainerState {}

class Cadastro extends Component<ContainerProps, ContainerState> {
  buscas: BuscasDogs

    buscaAtiva: BuscaAtiva

  attBuscas: Function

  constructor(props: ContainerProps) {
    super(props);

    this.buscas = new BuscasDogs();
    this.buscaAtiva = new BuscaAtiva();
    this.attBuscas = this.atualizaBuscas.bind(this);
  }

  componentDidMount() {
    this.buscas.inscrever(this.attBuscas);
  }

  componentWillUnmount() {
    this.buscas.desinscrever(this.attBuscas);
  }

  atualizaBuscas = (buscas: []) => {
    this.setState({ ...this.state, buscas });
  }

  render() {
    return (
      <div className="cadastro_container">
        <div className="item">
          <BuscaAtual busca={this.buscaAtiva}/>
        </div>
      <Container maxWidth="sm" className="card_main">
        <Formulario buscas={this.buscas} buscaAtiva={this.buscaAtiva} />
        <Carrossel buscasSalvas={this.buscas} />
      </Container>
      </div>
    );
  }
}

export default Cadastro;
