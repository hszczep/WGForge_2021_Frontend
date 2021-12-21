import storage from './components/storage/storage';
import appController from './components/controller/app.controller';
import router from './components/router/router';

class App {
  async init() {
    appController.spinner.show();
    await storage.init();
    await appController.init();
    appController.spinner.hide();
    router.init();
  }
}

export default new App();
