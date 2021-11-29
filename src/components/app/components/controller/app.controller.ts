import { Spinner } from '../../../spinner/spinner';

class Controller {
  spinner: Spinner = null;

  constructor() {
    this.init();
  }

  init() {
    this.spinner = new Spinner(document.body);
    this.spinner.init();
  }
}

export default new Controller();
