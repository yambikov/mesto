export default class UserInfo {
  constructor(formData) {
    this._name = document.querySelector(formData.nameInput);
    console.log(this._name)
    this._role = document.querySelector(formData.jobInput);
    console.log(this._role)
  }

  getUserInfo() {
    const name = document.querySelector('.profile__title').textContent;
    console.log(name)
    const role = document.querySelector('.profile__subtitle').textContent;
    console.log(role)
    console.log({ name, role })
    return { name, role };
  }

  setUserInfo({ name, role }) {
    this._name.textContent = name;
    this._role.textContent = role;
  }
}