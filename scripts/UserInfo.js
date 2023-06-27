export default class UserInfo {
  constructor(formData) {
    this._name = document.querySelector('.profile__title');
    this._role = document.querySelector('.profile__subtitle');
  }

  getUserInfo() {
    const name = this._name.textContent;
    const role = this._role.textContent;
    return { name, role };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._role.textContent = data.role;
  }
}
