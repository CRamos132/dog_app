class Observable {
    subscribed: Function[]

    constructor() {
      this.subscribed = [];
    }

    subscribe(func: Function) {
      this.subscribed.push(func);
    }

    unsubscribe(func: Function) {
      this.subscribed = this.subscribed.filter((inscrito) => inscrito !== func);
    }

    notify(param: any) {
      this.subscribed.forEach((funcao) => funcao(param));
    }
}

export default Observable;
