class Storage {
  constructor() {
    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
  }

  beforeUnloadHandler() {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  init() {
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }
}

export default new Storage();
