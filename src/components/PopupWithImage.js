import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  // Конструктор класса PopupWithImage принимает следующий аргумент:
  // selectorPopup: селектор всплывающего окна
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  // Открывает всплывающее окно с изображением и устанавливает атрибуты изображения и текст подписи
  open(name, link) {
    this._image.alt = name;
    this._image.src = link;
    this._caption.textContent = name;
    super.open();
  }
}
