export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    this._avatarElement.src = avatar;
    this._id = _id;
  }

  getId() {
    return this._id;
  }
}
