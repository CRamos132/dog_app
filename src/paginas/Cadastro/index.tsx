import React, { Component } from 'react';
import './index.css';
import { Container } from '@material-ui/core';
import Carrossel from '../../components/Carrossel';
import Formulario from '../../components/Formulario';
import CadastrosSalvos from '../../classes/CadastrosSalvos';
import CadastroAtual from '../../classes/CadastroAtual';
import DisplayCadastro from '../../components/DisplayCadastro';

interface ContainerProps {}
interface ContainerState {}

class Cadastro extends Component<ContainerProps, ContainerState> {
  cadastros: CadastrosSalvos

  cadastroAtual: CadastroAtual

  attCadastros: Function

  constructor(props: ContainerProps) {
    super(props);

    /* que fucionam como Observables que guardam os valores que seriam states
     visando a escalabilidade do projeto foram utilizados dois objetos
     desta maneira pode-se passar eles como props no lugar do state, assim 
     quando os valores são atualizados o componente pai não é re-renderizado
    */
    this.cadastros = new CadastrosSalvos();
    this.cadastroAtual = new CadastroAtual();
    this.attCadastros = this.atualizaCadastros.bind(this);
  }

  componentDidMount() {
    this.cadastros.subscribe(this.attCadastros);
  }

  componentWillUnmount() {
    this.cadastros.unsubscribe(this.attCadastros);
  }

  atualizaCadastros = (novosCadastros: []) => {
    this.setState((prevState) => {
      const newState = { ...prevState, novosCadastros };
      this.setState(newState);
    });
  }

  render() {
    return (
      <div className="cadastro_container">
        <DisplayCadastro cadastro={this.cadastroAtual} />
        <Container maxWidth="sm" className="card_main">
          <Formulario cadastros={this.cadastros} cadastroAtual={this.cadastroAtual} />
          <Carrossel cadastrosSalvos={this.cadastros} />
        </Container>
      </div>
    );
  }
}

export default Cadastro;
