import { LOCAL_STORAGE_KEYS } from "./common/services.constants";

class LocalStorageService {
  #setLocalStorageData(value: unknown, key: string = LOCAL_STORAGE_KEYS.USER) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  #getFromLocalStorage(key: string = LOCAL_STORAGE_KEYS.USER) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  #deleteFromLocalStorage(key: string = LOCAL_STORAGE_KEYS.USER) {
    sessionStorage.removeItem(key);
  }

  setUserInfo(name: string, token: string,) {
    this.#setLocalStorageData({ name, token });
  }

  getUserInfo() {
    return this.#getFromLocalStorage();
  }

  deleteUserInfo() {
    this.#deleteFromLocalStorage();
  }
}

export default new LocalStorageService();
