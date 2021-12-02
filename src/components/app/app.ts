import storage from './components/storage/storage';
import router from './components/router/router';

class App {
  async init() {
    await storage.init();
    router.init();
  }
}

export default new App();
