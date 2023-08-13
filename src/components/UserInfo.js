export default class UserInfo {
  // Конструктор класса UserInfo принимает следующие аргументы:
  // { nameSelector, jobSelector, avatarSelector }: объект с селекторами элементов имени, описания и аватара пользователя
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Возвращает информацию о пользователе в виде объекта с полями name и about
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
    };
  }

  // Устанавливает информацию о пользователе на странице, обновляя текстовое содержимое и атрибуты элементов
  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    this._avatarElement.src = avatar;
    this._id = _id;
  }

  // Возвращает идентификатор пользователя
  getId() {
    return this._id;
  }
}
