import { LOCAL_STORAGE_KEYS } from './common/services.constants';

class LocalStorageService {
  #setLocalStorageData(value: unknown, key: string = LOCAL_STORAGE_KEYS.USER) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  #getFromLocalStorage(key: string = LOCAL_STORAGE_KEYS.USER) {
    return JSON.parse(localStorage.getItem(key));
  }

  #deleteFromLocalStorage(key: string = LOCAL_STORAGE_KEYS.USER) {
    localStorage.removeItem(key);
  }

  setUserInfo(email: string, token: string) {
    this.#setLocalStorageData({ email, token });
  }

  getUserInfo() {
    return this.#getFromLocalStorage();
  }

  deleteUserInfo() {
    this.#deleteFromLocalStorage();
  }
}

export default new LocalStorageService();
