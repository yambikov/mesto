export default class UserInfo {
  constructor({ nameInput, jobInput }) {
    this._name = document.querySelector(nameInput);
    this._role = document.querySelector(jobInput);
  }

  getUserInfo() {
    const name = this._name.textContent;
    const role = this._role.textContent;

    return { name, role };
  }

  setUserInfo({ name, role }) {
    this._name.textContent = name;
    this._role.textContent = role;
  }
}