class Storage {
  mainData: Array<Object>
  constructor() {
    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
  }

  beforeUnloadHandler() {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  async init() {
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
    this.mainData = await fetch('https://wg-forge-back.herokuapp.com/api/products').then(res => res.json());
  }
}

export default new Storage();
