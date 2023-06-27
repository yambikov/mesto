export default class UserInfo {
  constructor(formData) {
    this._name = document.querySelector(formData.profileTitle);
    this._role = document.querySelector(formData.profileSubtitle);
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
