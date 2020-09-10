import Cadastro from '../interfaces/Cadastro';
import Observable from './Observable';

class CadastroAtual extends Observable {
    cadastro: Cadastro

    constructor() {
      super();

      this.cadastro = ({} as Cadastro);
    }

    atualizaCadastro(novoCadastro: Cadastro) {
      this.cadastro = novoCadastro;
      this.calculaValor(novoCadastro);
      this.notify(this.cadastro);
    }

    getCadastro(): Cadastro {
      return this.cadastro;
    }

    calculaValor(cadastro: Cadastro) {
      let valor = 0;
      if (cadastro.nome !== '') {
        valor += 5 * cadastro.nome.length;
      }
      if (cadastro.idade !== '') {
        valor += 10;
      }
      if (cadastro.raca !== '') {
        valor += 15;
      }
      if (cadastro.subraca !== '') {
        valor += 20;
      }
      this.cadastro.valor = valor;
    }
}

export default CadastroAtual;
