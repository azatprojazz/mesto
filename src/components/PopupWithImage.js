import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    this._image.alt = name;
    this._image.src = link;
    this._caption.textContent = name;
    super.open();
  }
}
