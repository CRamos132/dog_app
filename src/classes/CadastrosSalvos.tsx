import Cadastro from '../interfaces/Cadastro';
import Observable from './Observable';

class CadastrosSalvos extends Observable {
    cadastro: Cadastro[]

    constructor() {
      super();

      this.cadastro = [];
    }

    addCadastro(novoCadastro: Cadastro) {
      this.cadastro.push(novoCadastro);
      localStorage.setItem('cadastros', JSON.stringify(this.cadastro));
      this.notify(this.cadastro);
    }

    getCadastros(): Cadastro[] {
      return this.cadastro;
    }

    deletarCadastro(index: number) {
      this.cadastro = this.cadastro.splice(index, 1);
      this.notify(this.cadastro);
    }
}

export default CadastrosSalvos;
