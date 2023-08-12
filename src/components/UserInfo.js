export default class UserInfo {
  constructor(formData) {
    this._name = document.querySelector(formData.profileTitle);
    this._role = document.querySelector(formData.profileSubtitle);
    this._avatar = document.querySelector(formData.avatar);
  }

  getUserInfo() {
    const name = this._name.textContent;
    const about = this._role.textContent;
    return { name, about };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._role.textContent = data.about; // ранее data.role
    this._avatar.src = data.avatar;
    this._userID = data._id;
    // console.log(this._userID);
  }

}
