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
      this.calculaValor(novaBusca);
      this.notificar(this.busca);
    }

    getBusca(): Busca {
      return this.busca;
    }

    calculaValor(busca: Busca) {
      let valor = 0;
      if (busca.nome !== '') {
        valor += 5 * busca.nome.length;
      }
      if (busca.idade !== '') {
        valor += 10;
      }
      if (busca.raca !== '') {
        valor += 15;
      }
      if (busca.subraca !== '') {
        valor += 20;
      }
      this.busca.valor = valor;
    }
}

export default BuscaAtiva;
