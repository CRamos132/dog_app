import React, { Component } from 'react';
import './index.css';
import { Container } from '@material-ui/core';
import Carrossel from '../../components/Carrossel';
import Formulario from '../../components/Formulario';
import BuscasDogs from '../../classes/BuscasDogs';
import BuscaAtiva from '../../classes/BuscaAtiva';
import DisplayBusca from '../../components/DisplayBusca';

interface ContainerProps {}
interface ContainerState {}

class Cadastro extends Component<ContainerProps, ContainerState> {
  buscas: BuscasDogs

    buscaAtiva: BuscaAtiva

  attBuscas: Function

  constructor(props: ContainerProps) {
    super(props);

    // visando a escalabilidade do projeto foram utilizados dois objetos
    // que fucionam como Observables que guardam os valores que seriam states
    // desta maneira pode-se passar eles como props no lugar do state, assim 
    // quando os valores são atualizados o componente pai não é re-renderizado
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
    this.setState((prevState) => {
      const newState = { ...prevState, buscas };
      this.setState(newState);
    });
  }

  render() {
    return (
      <div className="cadastro_container">
        <DisplayBusca busca={this.buscaAtiva} />
        <Container maxWidth="sm" className="card_main">
          <Formulario buscas={this.buscas} buscaAtiva={this.buscaAtiva} />
          <Carrossel buscasSalvas={this.buscas} />
        </Container>
      </div>
    );
  }
}

export default Cadastro;
