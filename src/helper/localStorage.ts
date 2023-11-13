class LocalStorage {
  static getLocalStorageValue() {
    return localStorage.getItem('name-cinema-iloi');
  }

  static setLocalStorageValue(value: string) {
    localStorage.setItem('name-cinema-iloi', value);
  }
}

export default LocalStorage;
