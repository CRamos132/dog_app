import Busca from '../interfaces/Busca';
import Observable from './Observable';

class BuscasDogs extends Observable {
    buscas: Busca[]

    constructor() {
      super();

      this.buscas = [];
    }

    addBusca(novaBusca: Busca) {
      this.buscas.push(novaBusca);
      localStorage.setItem('buscas', JSON.stringify(this.buscas));
      this.notificar(this.buscas);
    }

    getBuscas(): Busca[] {
      return this.buscas;
    }

    deletarBusca(index: number) {
      this.buscas = this.buscas.splice(index, 1);
      this.notificar(this.buscas);
    }
}

export default BuscasDogs;
