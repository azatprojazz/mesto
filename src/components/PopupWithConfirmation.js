import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._submitForm = submitForm;

    this._form = this._popup.querySelector('.popup__form');
    this._currentCard = null;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._currentCard);
    });
    super.setEventListeners();
  }

  open(card) {
    this._currentCard = card;
    super.open();
  }
}
