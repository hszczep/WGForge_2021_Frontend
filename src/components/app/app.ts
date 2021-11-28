import storage from './components/storage/storage';
import router from './components/router/router';

class App {
  init() {
    storage.init();
    router.init();
  }
}

export default new App();
