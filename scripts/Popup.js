export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(); //закрой мне эту модалку
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target === this._popup ||
        evt.target.classList.contains('popup__close-btn')
      ) {
        this.close();
      }
    });
  }
}
