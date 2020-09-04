class Observable {
    inscritos: Function[]

    constructor() {
      this.inscritos = [];
    }

    inscrever(func: Function) {
      this.inscritos.push(func);
    }

    desinscrever(func: Function) {
      this.inscritos = this.inscritos.filter((inscrito) => inscrito !== func);
    }

    notificar(param: any) {
      this.inscritos.forEach((funcao) => funcao(param));
    }
}

export default Observable;
