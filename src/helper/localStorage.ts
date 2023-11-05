class LocalStorage {
  static getResult() {
    return localStorage.getItem('name-cinema-iloi');
  }

  static setResult(inputValue: string) {
    localStorage.setItem('name-cinema-iloi', inputValue);
  }
}

export default LocalStorage;
