import authUserService from '../../../../services/auth-user.service';
import { Spinner } from '../../../spinner/spinner';

class Controller {
  spinner: Spinner = null;

  #spinnerInit() {
    this.spinner = new Spinner(document.body);
    this.spinner.init();
  }

  init() {
    this.#spinnerInit();
    authUserService.updateUserState();
  }
}

export default new Controller();
