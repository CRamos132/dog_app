import Busca from '../interfaces/Busca';
import Observable from './Observable';

class BuscaAtiva extends Observable {
    busca: Busca

    constructor() {
      super();

      this.busca = ({} as Busca);
    }

    atualizaBusca(novaBusca: Busca) {
      this.busca = novaBusca;
      this.notificar(this.busca);
    }

    getBusca(): Busca {
      return this.busca;
    }
}

export default BuscaAtiva;
